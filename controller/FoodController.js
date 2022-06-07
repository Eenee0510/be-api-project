const foods = require("../models/Foods");

const getFoods = (req, res) => {
  foods.find({}, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
};

const createFood = (req, res) =>{
    const foods = req.body.data;
    for (let i = 0; i < foods.length; i++) {
      const reqBody = foods[i];
      const category = await FoodCategory.findById(ObjectId(reqBody.category_id));
      if (category) {
        let newFood = new Foods({
          _id: mongoose.Types.ObjectId(),
          name: reqBody.name,
          sales: reqBody.sales,
          price: reqBody.price,
          portion: reqBody.portion,
          stock: reqBody.stock,
          image: reqBody.image,
          tumb_img: reqBody.tumb_img,
          ingredients: reqBody.ingredients,
          discount: reqBody.discount,
          category: {
            category_id: category._id,
            category_name: category.name,
            category_color: category.color,
          },
        });
        newFood
          .save()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
}

module.exports = { getFoods, createFood };
