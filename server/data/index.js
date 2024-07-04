import { dbUrl } from "../config.js";
import { commodityDataEntry } from "./commodity.js";
import { manufacturerDataEntry } from "./manufacturers.js";
import { widgetDataEntry } from "./widgets.js";
import mongoose from "mongoose";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  await manufacturerDataEntry();
  await commodityDataEntry();
  await widgetDataEntry();

  mongoose.connection.close();
});
