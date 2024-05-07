const mongoos = require("mongoose");

const postSchema = new mongoos.Schema({
  uid: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  like: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});

const Post = new mongoos.model("Post", postSchema);

module.exports = { Post };
