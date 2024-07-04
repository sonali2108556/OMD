import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const commoditySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      //will be name with dash and append with category
      type: String,
      unique: true,
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
      default: Math.floor(Math.random()*1234+10000),
    },
    active: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Commodity = mongoose.model("Commoditie", commoditySchema);
export default Commodity;
