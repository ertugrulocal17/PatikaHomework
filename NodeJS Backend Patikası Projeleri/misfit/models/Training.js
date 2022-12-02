const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  trainingTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

TrainingSchema.pre("validate", function (next) {
  this.slug = slugify(this.trainingTime, {
    lower: true,
    strict: true,
  });
  next();
});

const Training = mongoose.model("Training", TrainingSchema);
module.exports = Training;
