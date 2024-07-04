import { managerOps, userOps } from "../utils/authentication.js";
import { protectedService, statusResponse } from "../utils/statusResponse.js";
import * as Constants from "../resources/constants.js";
import Cart from "../model/cart.js";

export const cartListService = (context) => {
  return protectedService(context, async ({ role, id }) => {
    if (managerOps(role)) {
      const carts = await Cart.find({ user: id }).populate("items.commodity");

      carts.forEach((cart) => {
        cart.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      });

      return {
        data: carts,
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

export const cartByIdService = (context) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const cart = await Cart.findOne({ user: id }).populate("items.commodity");
      if (cart) {
        cart.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      }
      return {
        data: cart ? cart.items : [],
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
export const addItemCartService = (context, args) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const cart = await Cart.findOne({ user: id });
      if (cart) {
        const tempItems = cart.items.filter((item) => item.commodity != args.commodityId);

        tempItems.push({ commodity: args.commodityId, quantity: args.quantity });
        cart.items = tempItems;
        await cart.save();
      } else {
        await Cart.create({ user: id, items: [{ commodity: args.commodityId, quantity: args.quantity }] });
      }
      const result = await Cart.findOne({ user: id }).populate("items.commodity");
      if (result) {
        result.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      }
      return {
        data: result.items,
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
export const deleteFromCartService = (context, args) => {
  return protectedService(context, async ({ role, id }) => {
    if (userOps(role)) {
      const cart = await Cart.findOne({ user: id });
      if (cart) {
        const tempItems = cart.items.filter((item) => item.commodity != args.commodityId);
        cart.items = tempItems;
        await cart.save();
      }
      const result = await Cart.findOne({ user: id }).populate("items.commodity");
      if (result) {
        result.items.sort((a, b) => {
          const dateA = new Date(a.commodity.createdAt);
          const dateB = new Date(b.commodity.createdAt);
          return dateA - dateB;
        });
      }

      return {
        data: result.items,
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
