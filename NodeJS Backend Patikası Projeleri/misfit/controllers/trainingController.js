const Training = require("../models/Training");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createTraining = async (req, res) => {
  try {
    const training = await Training.create({
      trainingTime: req.body.trainingTime,
      category: req.body.category,
      user: req.session.userID,
    });

    req.flash("success", `${training.name} has ben created successfully`);
    res.status(201).redirect("/trainings");
  } catch (error) {
    res.flash("error", `Something happend!`);
    res.status(400).redirect("/trainings");
  }
};

exports.getAllTrainings = async (req, res) => {
  try {
    // const query = req.query.search
    // let filter = {}
    // if(query){
    //   filter = {name:query}
    // }
    // if(!query && !categorySlug) {
    //   filter.name = "",
    //   filter.category = null
    // }
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ""), (filter.category = null);
    }

    const trainings = await Training.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("category")
      .populate("user");
    const categories = await Category.find();

    res.status(200).render("trainings", {
      trainings,
      categories,
      category,
      page_name: "trainings",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const training = await Training.findOne({ slug: req.params.slug })
      .populate("user")
      .populate("category");
    const categories = await Category.find();
    res.status(200).render("training", {
      training,
      categories,
      user,
      page_name: "trainings",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.enrollTraining = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.trainings.push({ _id: req.body.training_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseTraining = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.trainings.pull({ _id: req.body.training_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    const training = await Training.findOneAndRemove({ slug: req.params.slug });

    req.flash("sucess", `${training.name} has been removed successfully`);

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findOne({ slug: req.params.slug });

    (training.trainingTime = req.body.trainingTime),
      (training.category = req.body.category),
      training.save();
    req.flash("sucess", `${training.name} has been updated successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
