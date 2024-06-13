import { Schema } from "mongoose";

export const frameSchema = new Schema({
  type: String,
  sectionName: String,
  frameName: String,
  frameId: String,
  thumbnailURL: String,
  archiveURL: Array,
});
