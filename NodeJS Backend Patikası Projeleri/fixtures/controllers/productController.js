const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      category: req.body.category,
      user: req.session.userID,
    });
    req.flash("success", `${product.name} has ben added successfully`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
    res.flash("error", `Something happend!`);
    res.status(400).redirect("/products");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
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
    const products = await Product.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");

    const categories = await Category.find();

    res.status(200).render("products", {
      products,
      categories,
      category,
      page_name: "products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "user"
    );

    res.status(200).render("product", {
      product,
      user,
      page_name: "products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAddToCart = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.products.push({ _id: req.body.product_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.products.pull({ _id: req.body.product_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndRemove({ slug: req.params.slug });

    req.flash("sucess", `${product.name} has been removed successfully`);

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    (product.name = req.body.name),
      (product.desc = req.body.desc),
      (product.price = req.body.price),
      (product.category = req.body.category),
      product.save();
    req.flash("success", `${product.name} has ben updated successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
