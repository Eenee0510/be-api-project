const mongoose = require("mongoose");
const foodsSchema = mongoose.Schema({
  sales: Boolean,
  _id: mongoose.Schema.Types.ObjectId,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  name: { type: String, required: [true, "Enter the food name!"] },
  price: Number,
  portion: Number,
  stock: Number,
  image: String,
  tumb_img: String,
  ingredients: String,
  discount: Number,
  category: { type: String, ref: "category" },
});
module.exports = mongoose.model("foods", foodsSchema);
