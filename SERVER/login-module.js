const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  loginname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_time: {
    type: String,
    required: true,
  },
});

const Login = new mongoose.model("Login", loginSchema);

module.exports = { Login };
