const { model, Schema } = require("mongoose");

const frameSchema = new Schema({
  type: String,
  sectionName: String,
  frameName: String,
  frameId: String,
  thumbnailURL: String,
  archiveURL: Array,
});

const variableAndImagesSchema = new Schema({
  type: String,
  name: String,
  valuesByMode: Schema.Types.Mixed,
  id: String,
  url: String,
  hasChanged: { type: Boolean, default: false },
});

const sectionSchema = new Schema({
  type: String,
  name: String,
  id: String,
  frames: [frameSchema],
});

const DesignSchema = new Schema({
  FigmaName: String,
  FigmaFileKey: String,
  FigmaId: String,
  sections: [sectionSchema],
  images: [variableAndImagesSchema], // Assuming images have the same structure as variables
  variables: [variableAndImagesSchema],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    // required: true,
  },
  usedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  hasChanged: {
    type: Boolean,
    // required: true,
    default: false,
  },
  isOkToDownload: {
    type: Boolean,
    // required: true,
    default: false,
  },
});

const Design = model("Designs", DesignSchema);

module.exports = Design;
