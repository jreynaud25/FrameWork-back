"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
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
exports.Brand = (0, mongoose_1.model)("Brand", brandSchema);
