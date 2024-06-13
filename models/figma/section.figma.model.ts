import { Schema } from 'mongoose';
import { frameSchema } from './frame.figma.model';

export const sectionSchema = new Schema({
  type: String,
  name: String,
  id: String,
  frames: [frameSchema],
});