const mongoose = require("mongoose");
const category = require("./FoodCategory");
const foodsSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Enter the food name"],
  },
  price: {
    type: Number,
    required: [true, "Enter the food price"],
  },
  portion: {
    type: Number,
    required: [true, "Enter the food portion"],
  },
  stock: {
    type: Number,
    required: [true, "Enter the food stock"],
  },
  image: {
    type: String,
    required: [true, "Enter the food image"],
  },
  tumb_img: {
    type: String,
    required: [true, "Enter the food thumbnail"],
  },
  ingredients: {
    type: String,
    required: [true, "Enter the food ingredients"],
  },
  sales: {
    type: Boolean,
    required: [true, "Is the food sold or not"],
  },
  discount: {
    type: Number,
  },
  category: {
    type: mongoose.SchemaTypes.Mixed,
    ref: "category",
  },
});
module.exports = mongoose.model("foods", foodsSchema);
