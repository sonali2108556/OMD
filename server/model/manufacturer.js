import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema(
  {
    manufacturerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    website: String,
  },
  {
    timestamps: true,
  }
);

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
export default Manufacturer;
