"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
const client_model_1 = require("../models/client.model");
dotenv_1.default.config();
const isAuthenticated = async (req, res, next) => {
    try {
        console.log('Bonjour');
        let token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }
        token = token.replace('Bearer ', '');
        //console.log(token);
        //const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || '');
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('here the token', decodedToken);
        //req.user = decodedToken;
        //const user = await Client.findById(decodedToken._id);
        const user = await client_model_1.Client.findById("6551f8d5571275e2f51e4153");
        req.user = user;
        // Everything is good, let's move to the next route
        next();
        // res.send(user)
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
