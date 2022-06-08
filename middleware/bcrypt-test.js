var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
bcrypt.hash("password", salt).then((data) => console.log(data));
