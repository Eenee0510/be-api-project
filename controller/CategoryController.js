const category = require("../models/FoodCategory");

const getCategories = (req, res, next) => {
  category.find({}, function (err, data) {
    console.log(data);
    if (err) throw err;
    res.json(data);
  });
};
const createCategory = (req, res, next) => {
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
};

const updateCategory = (req, res) => {
  category.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    function (err, data) {
      if (err) throw err;
      res.send("updated");
    }
  );
};

const deleteCategory = (req, res) => {
  console.log(req.params.id);
  category.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.send("removed");
  });
};
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
