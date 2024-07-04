import mongoose, { Schema } from "mongoose";

const commoditySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "U",
  },
  sellingUnit: {
    type: String,
    default: "strip",
  },
  benefits: {
    type: [
      new Schema({
        title: {
          type: String,
          required: true,
        },
        summary: {
          type: String,
          required: true,
        },
      }),
    ],
    default: [],
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  mfdDate: {
    type: Date,
    required: true,
  },
  batchNo: {
    type: String,
    required: true,
  },
  disclaimer: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    default: [],
  },
  content: {
    details: {
      type: String,
      required: true,
    },
    composition: {
      type: [String],
      default: [],
    },
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  sideEffects: {
    type: [String],
    default: [],
  },
  usedFor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.2,
  },
  purchasedBy: {
    type: Number,
    default: Math.floor(Math.random() * 1234 + 10000),
  },
  active: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const deliverySchema = new Schema({
  deliveryDate: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});
const paymentSchema = new Schema(
  {
    method: String,
    transactionId: String,
    bankName: String,
    accountHolder: String,
    accountNumber:String,
    ifsc: String,
    upi: String,
    cardNo: String,
  },
  { timestamps: true }
);
const OrderSchema = new Schema(
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
              type: commoditySchema,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    delivery: {
      type: deliverySchema,
      required: true,
    },
    payment: {
      type: paymentSchema,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", OrderSchema);
export default Orders;
