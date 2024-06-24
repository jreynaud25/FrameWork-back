import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  figmaName: String,
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

export const Image = model('Image', imageSchema);
