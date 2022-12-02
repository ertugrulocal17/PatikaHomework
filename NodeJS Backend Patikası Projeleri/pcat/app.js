const express = require('express');
const mongoose = require('mongoose')
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
require('dotenv').config();
  
const pageRoute = require('./routes/pageRoute')
const photoRoute = require('./routes/photoRoute')

const app = express();

//connect DB
mongoose.connect(`${process.env.MONGODB_LINK}`, {
  useNewUrlParser: true,
}).then(() => {
  console.log('DB CONNECTED!')
}).catch((err) => {
  console.log(err)
})

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Route
app.use('/', pageRoute);
app.use('/', photoRoute)

const PORT = 3330;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});