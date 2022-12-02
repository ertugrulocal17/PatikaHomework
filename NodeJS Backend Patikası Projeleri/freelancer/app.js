const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
require('dotenv').config()

const projectRoute = require('./routes/projectRoute')

const app = express()

//connect DB
mongoose.connect(`${process.env.MONGODB_LINK}`, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('DB CONNECTED!')
  }).catch((err) => {
    console.log(err)
  })

//Tmeplate Engince
app.set('view engine', 'ejs')

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload())
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET']
    })
)


app.use('/', projectRoute)

const PORT = 3333
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})