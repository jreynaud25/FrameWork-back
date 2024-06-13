import { Schema, model } from "mongoose";


const brandSchema = new Schema({
  FigmaName: String,
  FigmaId: { type: String, unique: true },
  elements: { 
    type: [
      {
        name: String,
        type: String,
        characters: String,
        nodeid: String,
        elements: {
          type: [Object], 
          default: undefined 
        }, 
      }
    ], 
    default: undefined 
  },
  isPrivate: Boolean, // Set default to undefined
});

export const Brand = model("Brand", brandSchema);
