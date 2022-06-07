const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const category = require("../models/FoodCategory");
const foods = require("../models/Foods");
const CategoryController = require("../controller/CategoryController");
const FoodCategory = require("../controller/FoodController");

router.get("/category", CategoryController.getCategories);
router.post("/new/cat", CategoryController.createCategory);
router.put("/update/cat", CategoryController.updateCategory);
router.delete("/delete/cat", CategoryController.deleteCategory);

router.get("/foods", FoodCategory.getFoods);
router.get("/new/food", FoodCategory.createFood);

router.get("/foods/search", (req, res) => {
  console.log(req.query.name);
  foods.find({ name: { $regex: `${req.query.name}` } }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.get("/foods/food/:id", (req, res) => {
  console.log(req.params.id);
  foods.findById({ _id: `${req.params.id}` }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.post("/category", jsonParser, (req, res) => {
  const reqBody = req.body;
  let newcategory = new category({
    _id: mongoose.Types.ObjectId(),
    name: reqBody.name,
    color: reqBody.color,
  });
  newcategory
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Success");
});

router.put("/foods", jsonParser, (req, res) => {
  category.findByIdAndUpdate(
    req.body.id,
    {
      sales: reqBody.sales,
      _id: mongoose.Types.ObjectId(),
      category_id: reqBody.category_id,
      name: reqBody.name,
      price: reqBody.price,
      portion: reqBody.portion,
      stock: reqBody.stock,
      image: reqBody.image,
      tumb_img: reqBody.tumb_img,
      ingredients: reqBody.incredients,
      dissount: reqBody.discount,
      category: reqBody.category,
    },
    function (err, data) {
      if (err) throw err;
      res.send("foods updated");
    }
  );
});

module.exports = router;
