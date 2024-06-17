"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
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
exports.image = (0, mongoose_1.model)("Image", imageSchema);
