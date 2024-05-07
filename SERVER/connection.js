const mongoos = require("mongoose");
const URL = process.env.MONGOURL;
const connect = async (req, res) => {
  try {
    mongoos.connect(URL);
  } catch (error) {
    return console.log("Not Connect Data Base");
  }
};

module.exports = connect;
