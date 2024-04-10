const mongoose = require("mongoose");

// Define the schema
const imageSchema = new mongoose.Schema({
  figmaId: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: Object,
    required: true,
  },
});

// Create the model
const Image = mongoose.model("Image", imageSchema);

// Export the model
module.exports = Image;
