const express = require("express");
const userInfo = require("./user-modul");
const router = express.Router();
const controler = require("./controler");
const postModule = require("./post-module");
const userModule = require("./user-modul");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../instagram/src/Image/Profile/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../instagram/src/Image/Post");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadpost = multer({ storage: storage1 });

router.get("/Home", controler.Home);
router.post("/account/Register", controler.Register);
router.post("/account/login", controler.Login);
router.post("/account/userinfo", controler.Userinfo);
router.post("/account/updateprofile", controler.UpdateProfile);
router.get("/account/postdata", controler.PostData);
router.post("/account/postdata/user", controler.Userpostdata);
router.post("/account/postdata/deletepost", controler.PostDelete);
router.post("/account/postdata/postfind", controler.PostFind);
router.post("/account/postdata/postupdate", controler.PostUpdate);
router.post("/account/searchUser", controler.SearchUser);

router.post("/account/updatedp", upload.single("file"), async (req, res) => {
  const data = req.file.filename;

  const userId = req.body.uid;
  const insertdata = await userInfo.User.updateOne(
    { _id: userId },
    { $set: { profile: data } }
  );
  if (insertdata) {
    res.status(200).json({ msg: "Profile Save" });
  } else {
    res.status(400).json({ msg: "Profile Not Save" });
  }
});

router.post("/account/updatedp", upload.single("file"), async (req, res) => {
  const data = req.file.filename;
  const userId = req.body.uid;
  const insertdata = await userInfo.User.updateOne(
    { _id: userId },
    { $set: { profile: data } }
  );
  if (insertdata) {
    res.status(200).json({ msg: "Profile Save" });
  } else {
    res.status(400).json({ msg: "Profile Not Save" });
  }
});

router.post("/account/post", uploadpost.single("file"), async (req, res) => {
  let formData = await {
    uid: req.body.uid,
    title: req.body.title,
    discription: req.body.discription,
    image: req.file.filename,
    location: req.body.location,
    date: req.body.date,
  };

  const username1 = await userModule.User.findOne({ _id: formData.uid });

  const insertdata = await postModule.Post.create({
    uid: formData.uid,
    username: username1.username,
    profile: username1.profile,
    title: formData.title,
    discription: formData.discription,
    image: formData.image,
    location: formData.location,
    date: formData.date,
  });
  if (insertdata) {
    res.status(200).json({ msg: "Profile Save" });
  } else {
    res.status(400).json({ msg: "Profile Not Save" });
  }
});

module.exports = router;
