const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  name: String,
  type: String,
  characters: String,
  elements: { type: [Object], default: undefined }, // Set default to undefined
});

const brandSchema = new mongoose.Schema({
  FigmaName: String,
  FigmaId: String,
  elements: { type: [elementSchema], default: undefined }, // Set default to undefined
});

const Element = mongoose.model("Element", brandSchema);

module.exports = Element;
