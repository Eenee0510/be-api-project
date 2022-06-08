const Users = require("../models/Users");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { find } = require("../models/Category");

const register = async (req, res, next) => {
  const data = req.body;
  if (data) {
    const oldUser = await Users.findOne({ email: data.email }); //registered bnauu ugui yu gedgiig shalgah gej bna
    if (oldUser != null) {
      return res.json({ message: "This email is already registered!" });
    }
    var bcrypt = require("bcryptjs");
    var hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");

    Users.create(data)
      .then((data) => {
        email = data.email;
        const token = jwt.sign(
          {
            user_id: data._id,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
        return;
      })
      .catch(next);
  } else {
    return res.json({
      error: "The input field id empty",
    });
  }
};
const login = async (req, res, next) => {
  const data = req.body;
  const email = data.email;

  if (email == null || data.password == null) {
    return res.json({
      error: "The email or password field is empty!",
    });
  }
  const findUser = await Users.findOne({ email });
  if (findUser == null) {
    return res.json({
      error: "Your email is not registered!",
    });
  }
  if (findUser && (await bcrypt.compare(data.password, findUser.password))) {
    const token = jwt.sign(
      { user_id: findUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({
      success: true,
      data: findUser,
      token: token,
    });
    return;
  }
};

module.exports = { register, login };
