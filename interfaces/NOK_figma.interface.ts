import { Document, Model, Schema, model } from 'mongoose';

export interface IFigma {
  figmaName: String;
  figmaFileKey: String;
  figmaId: String;
  sections: IFigmaSectionSchema[];
  images: IFigmaVariableAndImagesSchema[]; // Assuming images have the same structure as variables
  variables: IFigmaVariableAndImagesSchema[];
  creator: {
    type: Schema.Types.ObjectId;
    ref: 'Client';
    // required: true,
  };
  usedBy: [
    {
      type: Schema.Types.ObjectId;
      ref: 'Client';
    }
  ];
  hasChanged: {
    type: Boolean;
    // required: true,
    default: false;
  };
  isOkToDownload: {
    
    type: Boolean;
    // required: true,
    default: false;
  };
}

export interface IFigmaSchema extends Document {
  type: string;
  sectionName: string;
  frameName: string;
  frameId: string;
  thumbnailURL: String;
  archiveURL: Array<String>;
}

export interface IFigmaFrame extends Document {
  type: String;
  sectionName: String;
  frameName: String;
  frameId: String;
  thumbnailURL: String;
  archiveURL: Array<string>;
}

export interface IFigmaVariableAndImagesSchema  {
  type: String;
  name: String;
  valuesByMode: Schema.Types.Mixed;
  id: String;
  url: String;
  hasChanged: { type: Boolean; default: false };
}

export interface IFigmaSectionSchema {
  type: String;
  name: String;
  id: String;
  frames: IFigmaFrame[];
}
