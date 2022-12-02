const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
require("dotenv").config();

const pageRoute = require("./routes/pageRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();
//connect DB
mongoose
  .connect(`${process.env.MONGODB_LINK}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set("view engine", "ejs");
global.userIN = null;

//Middleware

app.use(express.static("public"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat", // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `${process.env.MONGODB_LINK}` }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Route
app.use("/", pageRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

//Port
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
