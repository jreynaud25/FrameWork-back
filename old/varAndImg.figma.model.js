"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variableAndImagesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.variableAndImagesSchema = new mongoose_1.Schema({
    type: String,
    name: String,
    valuesByMode: mongoose_1.Schema.Types.Mixed,
    id: String,
    url: String,
    hasChanged: { type: Boolean, default: false },
});
