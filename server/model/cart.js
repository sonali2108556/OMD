import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        new Schema(
          {
            commodity: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Commoditie",
              required: true,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
