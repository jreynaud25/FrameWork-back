import { Schema, model } from 'mongoose';
import { sectionSchema } from './figma/section.figma.model';
import { variableAndImagesSchema } from './figma/varAndImg.figma.model';

const DesignSchema = new Schema({
  FigmaName: String,
  FigmaFileKey: String,
  FigmaId: String,
  sections: [sectionSchema],
  images: [variableAndImagesSchema], // Assuming images have the same structure as variables
  variables: [variableAndImagesSchema],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    // required: true,
  },
  usedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Client',
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

export const Design = model('Design', DesignSchema);
