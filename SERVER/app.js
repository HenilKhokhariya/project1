require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Path = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "POST,GET,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
const connectDb = require("./connection");
const router = require("./router");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);

//Static File

app.use(express.static(path.join(__dirname, "../instagram/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../instagram/build/index.html"));
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("SERVER START");
  });
});
