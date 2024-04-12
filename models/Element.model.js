const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  name: String,
  type: String,
  characters: String,
  nodeid: String,
  elements: { type: [Object], default: undefined }, // Set default to undefined
});

const brandSchema = new mongoose.Schema({
  FigmaName: String,
  FigmaId: { type: String, unique: true },
  elements: { type: [elementSchema], default: undefined }, // Set default to undefined
});

const Element = mongoose.model("Element", brandSchema);

module.exports = Element;
