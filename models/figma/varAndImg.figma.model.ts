import { Schema } from "mongoose";

export const variableAndImagesSchema = new Schema({
  type: String,
  name: String,
  valuesByMode: Schema.Types.Mixed,
  id: String,
  url: String,
  hasChanged: { type: Boolean, default: false },
});

