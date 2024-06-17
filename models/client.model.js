"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    username: {
        required: true,
        unique: true,
        trim: true,
        maxLength: 50,
        type: String,
    },
    password: {
        type: String,
        select: false,
    },
    email: {
        type: String,
    },
    pictureUrl: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Client', 'admin'],
        default: 'Client',
    },
});
exports.Client = (0, mongoose_1.model)('Client', ClientSchema);
// module.exports = Client;
