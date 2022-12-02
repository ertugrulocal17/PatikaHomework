const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema ({
    title: String,
    desc: String,
    image: String,
    client: String,
    category: String,
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project