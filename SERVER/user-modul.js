const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
  },
  username: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  date_time: {
    type: Date,
    require: true,
  },
  profile: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
