import { Widget } from "../model/widgets.js";
import { widgetLinkTo } from "../services/widgets.js";

let widgets = [
  {
    title: "Exercise",
    icon: "fitness_center",
    background: "#450d59",
    description: "Widget for tracking workout",
  },
  {
    title: "Meal",
    icon: "restaurant",
    background: "#ff6250",
    description: "Widget for tracking calorie intake",
  },
  {
    title: "Sleep",
    icon: "hotel",
    background: "#FF69B4",
    description: "Widget for tracking sleep",
  },
  {
    title: "Water",
    icon: "local_drink",
    background: "#662d91",
    description: "Widget for tracking water intake",
  },
];

widgets = widgets.map((item) => {
  item.to = widgetLinkTo(item.title);
  return item;
});

// console.warn(widgets);

// Connect to MongoDB
export const widgetDataEntry = async () => {
  try {
    const response = await Widget.deleteMany({});
    console.log(response);

    await Widget.insertMany(widgets);
    console.log("Widgets inserted successfully");
  } catch (err) {
    console.error("Error inserting widgets:", err);
  }
};
