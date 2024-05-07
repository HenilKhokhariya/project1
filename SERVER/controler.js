const userModule = require("./user-modul");
const bcryp = require("bcrypt");
const LoginM = require("./login-module");
const postModule = require("./post-module");

const Home = async (req, res) => {
  res.status(200).send("This Is Home Page" + a.name);
};

const Register = async (req, res) => {
  try {
    let formdata = {
      name: "",
      phone: "",
      email: "",
      profile: "pngwing.com.png",
      bio: "",
      username: "",
      password: "",
      date: "",
    };
    formdata = req.body;
    const pwh = await bcryp.hash(formdata.password, 10);
    formdata.password = await pwh;
    const userExist = await userModule.User.findOne({
      username: formdata.username,
    });
    if (userExist) {
      return res.status(400).json({ msg: "User Name Already Exist" });
    } else {
      const userEmail = await userModule.User.findOne({
        email: formdata.email,
      });
      if (userEmail) {
        return res.status(400).json({ msg: "Email Already Exist" });
      } else {
        const data = await userModule.User.create(formdata);
        return res.status(200).json({ msg: "Register Success" });
      }
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

const Login = async (req, res) => {
  try {
    let formdata = {
      username: "",
      password: "",
      date_time: "",
    };
    formdata = req.body;

    const user = await userModule.User.findOne({
      username: formdata.username,
    });
    const useremail = await userModule.User.findOne({
      email: formdata.username,
    });

    if (user) {
      const pw = await bcryp.compare(formdata.password, user.password);
      if (pw) {
        return res.status(200).json({ msg: "Login Success", _id: user._id });
      } else {
        return res.status(400).json({ msg: "Enter Vaild Password" });
      }
    } else if (useremail) {
      const pw = await bcryp.compare(formdata.password, useremail.password);
      if (pw) {
        const data = await LoginM.Login.create({
          userid: useremail._id,
          loginname: formdata.username,
          password: useremail.password,
          date_time: new Date().toLocaleString(),
        });
        return res
          .status(200)
          .json({ msg: "Login Success", _id: useremail._id });
      } else {
        return res.status(400).json({ msg: "Enter Vaild Password" });
      }
    } else {
      return res.status(400).json({ msg: "Enter Vaild User Name" });
    }
  } catch (error) {
    return console.log(error);
  }
};

const Userinfo = async (req, res) => {
  try {
    const _id = req.body.uid;
    const user = await userModule.User.findOne({ _id });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const UpdateProfile = async (req, res) => {
  try {
    let formdata = {
      username: "",
      name: "",
      phone: "",
      email: "",
      bio: "",
    };

    const UID = await req.body._id;
    formdata = await req.body;
    const userExist = await userModule.User.findOne({
      username: formdata.username,
    });
    const useremail = await userModule.User.findOne({
      email: formdata.email,
    });
    if (userExist) {
      if (userExist._id.toLocaleString() === UID) {
        const user = await userModule.User.updateOne(
          { _id: UID },
          {
            $set: {
              username: formdata.username,
              name: formdata.name,
              phone: formdata.phone,
              bio: formdata.bio,
              email: formdata.email,
            },
          }
        );
        if (user) {
          return res.status(200).json({ msg: "Profile Updated" });
        } else {
          return res.status(400).json({ msg: "Profile Not Updated" });
        }
      } else {
        return res.status(400).json({ msg: "Already Exist User Name" });
      }
    } else {
      const user = await userModule.User.updateOne(
        { _id: UID },
        {
          $set: {
            username: formdata.username,
            name: formdata.name,
            phone: formdata.phone,
            bio: formdata.bio,
            email: formdata.email,
          },
        }
      );
      if (user) {
        return res.status(200).json({ msg: "Profile Updated" });
      } else {
        return res.status(400).json({ msg: "Profile Not Updated" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const PostData = async (req, res) => {
  try {
    const user = await postModule.Post.find({}).sort({ date: -1 });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const Userpostdata = async (req, res) => {
  try {
    const UID = req.body.uid;
    const user = await postModule.Post.find({ uid: UID }).sort({ date: -1 });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const PostDelete = async (req, res) => {
  try {
    const UID = req.body.uid;
    const user = await postModule.Post.deleteOne({ _id: UID });
    return res.status(200).json({ msg: "Delete Record" });
  } catch (error) {
    console.log(error);
  }
};

const PostFind = async (req, res) => {
  try {
    const UID = req.body.uid;
    const user = await postModule.Post.findOne({ _id: UID });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const PostUpdate = async (req, res) => {
  let formData = await {
    pid: req.body._id,
    uid: req.body.uid,
    title: req.body.title,
    discription: req.body.discription,
    location: req.body.location,
  };
  const Updatetdata = await postModule.Post.updateOne(
    { _id: formData.pid },
    {
      $set: {
        title: formData.title,
        discription: formData.discription,
        location: formData.location,
      },
    }
  );
  if (Updatetdata) {
    res.status(200).json({ msg: "Post Update" });
  } else {
    res.status(400).json({ msg: "Post Not Update" });
  }
};

const SearchUser = async (req, res) => {
  try {
    const search = req.body.search;
    const data = await userModule.User.find({
      username: { $regex: `^${search}` },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send("Not Find");
  }
};

module.exports = {
  Home,
  Register,
  Login,
  Userinfo,
  UpdateProfile,
  PostData,
  Userpostdata,
  PostDelete,
  PostFind,
  PostUpdate,
  SearchUser,
};
