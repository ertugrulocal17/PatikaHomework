const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Category = require("../models/Category");
const Training = require("../models/Training");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Your Password is Not Correct!");
          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "User is Not Exists!");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "trainings"
  );
  const categories = await Category.find();
  const trainings = await Training.find({ user: req.session.userID }).populate(
    "category"
  );
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    users,
    categories,
    trainings,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    await Training.deleteMany({ user: req.params.id });

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
