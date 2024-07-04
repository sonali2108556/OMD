import Orders from "../model/orders.js";
import { userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";
import Cart from "../model/cart.js";

export const orderByIdService = (context, orderId) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const result = await Orders.findOne({ _id: orderId, user: id }).populate("items.commodity");
      if (result) {
        result.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      }
      return {
        data: result,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
};

export const orderListService = (context) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const orders = await Orders.find({ user: id }).populate("items.commodity");
      orders.forEach((order) => {
        order.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      });

      return {
        data: orders,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
};
export const createOrderService = (context, args) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const cart = await Cart.findOne({ user: id }).populate("items.commodity");

      // console.log(cart);
      let orderAmount = 0;
      cart.items.forEach((cartItem) => {
        orderAmount = orderAmount + cartItem.commodity.price * cartItem.quantity;
      });

      const data = {
        user: id,
        items: cart.items,
        amount: orderAmount,
        delivery: args,
      };
      const order = await Orders.create(data);
      return {
        data: order,
        status: statusResponse(Constants.OPERATION_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.ACCESS_DENIED.value),
      };
    }
  });
};
function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const updateOrderService = (context, args) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      let order = await Orders.findOne({ user: id, _id: args.orderId });
      console.log(order);
      order.status = args.status;
      if (args.status === "Successful") {
        order.payment = {
          method: args.method,
          transactionId: generateRandomString(12),
          bankName:args.bankName,
          accountHolder:args.accountHolder,
          accountNumber:args.accountNumber,
          ifsc:args.ifsc,
          upi:args.upiId,
          cardNo:args.cardNo,
        };
        await Cart.deleteOne({ user: id });
      }
      await order.save();
      order = await Orders.findOne({ user: id, _id: args.orderId }).populate("items.commodity");
      return {
        data: order,
        status: statusResponse(Constants.INFO_SUCCESS.value),
      };
    } else {
      return {
        data: null,
        status: statusResponse(Constants.INFO_DENIED.value),
      };
    }
  });
};
