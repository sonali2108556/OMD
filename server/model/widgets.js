import { Schema, model } from "mongoose";

const widgetSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    background: { type: String, required: true },
    description: { type: String, default: "" },
    to: { type: String, required: true },
  },
  { timestamps: true }
);

export const Widget = model("Widget", widgetSchema);
