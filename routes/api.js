const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const category = require("../models/category");
const foods = require("../models/foods");

router.get("/category", (req, res) => {
  category.find({}, function (err, data) {
    console.log(data);
    if (err) throw err;
    res.json(data);
  });
});

router.get("/foods", (req, res) => {
  foods.find({}, function (err, data) {
    console.log(data);
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
router.post("/foods", jsonParser, (req, res) => {
  const reqBody = req.body;
  let newfoods = new foods({
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
  });

  newfoods
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Success");
});

router.delete("/category/:id", (req, res) => {
  console.log(req.params.id);
  category.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.send("removed");
  });
});

router.put("/category", jsonParser, (req, res) => {
  category.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    function (err, data) {
      if (err) throw err;
      res.send("updated");
    }
  );
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
