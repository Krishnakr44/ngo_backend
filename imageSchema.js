// imageSchema.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageData: String, // Store image data as Buffer type
  title: String,
  description: String,
});

module.exports = mongoose.model("Image", imageSchema);
