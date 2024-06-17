"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Design = void 0;
const mongoose_1 = require("mongoose");
const section_figma_model_1 = require("./figma/section.figma.model");
const varAndImg_figma_model_1 = require("./figma/varAndImg.figma.model");
const DesignSchema = new mongoose_1.Schema({
    FigmaName: String,
    FigmaFileKey: String,
    FigmaId: String,
    sections: [section_figma_model_1.sectionSchema],
    images: [varAndImg_figma_model_1.variableAndImagesSchema],
    variables: [varAndImg_figma_model_1.variableAndImagesSchema],
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        // required: true,
    },
    usedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
exports.Design = (0, mongoose_1.model)('Design', DesignSchema);
