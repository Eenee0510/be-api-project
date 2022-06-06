const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const category = require("../models/category");

router.get("/category", (req, res) => {
  category.find({}, function (err, data) {
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

module.exports = router;
