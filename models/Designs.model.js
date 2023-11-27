const { model, Schema } = require("mongoose");

const DesignSchema = new Schema(
  {
    name: {
      required: true,
      unique: true,
      trim: true,
      maxLength: 50,
      type: String,

      // set: (value) => {
      // 	return value[0].toUpperCase() + value.slice(1)
      // },
    },
    picture: {
      type: String,
      default: "https://picsum.photos/200",
    },
    figmaID: {
      type: String,
      required: true,
    },
    figmaNodeIDs: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    usedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
    asChanged: {
      type: Boolean,
      required: true,
    },
    isOkToDownload: {
      type: Boolean,
      required: true,
      default: false,
    },

    textValues: [
      {
        type: String,
      },
    ],
    numberOfTextEntries: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Design = model("Designs", DesignSchema);

module.exports = Design;
