"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionSchema = void 0;
const mongoose_1 = require("mongoose");
const frame_figma_model_1 = require("./frame.figma.model");
exports.sectionSchema = new mongoose_1.Schema({
    type: String,
    name: String,
    id: String,
    frames: [frame_figma_model_1.frameSchema],
});
