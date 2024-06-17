"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.frameSchema = new mongoose_1.Schema({
    type: String,
    sectionName: String,
    frameName: String,
    frameId: String,
    thumbnailURL: String,
    archiveURL: Array,
});
