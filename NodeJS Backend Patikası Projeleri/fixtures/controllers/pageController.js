const nodemailer = require("nodemailer");
const Product = require("../models/Product");
require("dotenv").config();

exports.getIndexPage = (req, res) => {
  const products = Product.find().sort("-createdAt").limit(4);
  res.status(200).render("index", {
    page_name: "index",
    products,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getBlogPage = (req, res) => {
  res.status(200).render("blog", {
    page_name: "blog",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
      <li>Name:${req.body.name} </li>
      <li>Email:${req.body.email} </li>
      <li>Phone:${req.body.phone} </li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    // Message object
    let message = {
      from: `Fixtures Contact Email <${process.env.EMAIL}>`,
      to: `${process.env.EMAIL}`,
      subject: "Fixtures Contact New Message",
      html: outputMessage,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      // console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    req.flash("success", "We Received your message succesfully");
    res.status(200).redirect("contact");
  } catch (err) {
    //req.flash('error', `Something happend! ${err}`);
    req.flash("error", `Something happend!`);

    res.status(200).redirect("contact");
  }
};
