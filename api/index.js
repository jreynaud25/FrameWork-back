"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_routes_1 = require("../routes/index.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const routes = new index_routes_1.Routes().routes;
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/framework')
    .then(async (db) => {
    console.log(`Connected to ${db.connection.name}`);
})
    .catch((error) => {
    console.log(error.message);
});
//app.get('/ro', isAuthenticated, (req, res, next) => res.send('cocuou'));
routes.forEach((route) => {
    const { method, path, action, controller, middlewares } = route;
    app[method](path, middlewares
        ? middlewares.map((middleware) => async (req, res, next) => middleware(req, res, next))
        : [], async (req, res, next) => {
        try {
            const result = await controller[action](req, res, next);
            res.status(200).json({ data: result });
        }
        catch (error) {
            next(error);
        }
    });
});
app.use('*', (_req, res, _next) => {
    res.status(404).json({ message: "That's a 404 right here..." });
});
app.use((err, _req, res, _next) => {
    console.log(err);
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Cast error',
            details: 'Make sure you are sending correct information',
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ error: err, message: err.message });
});
app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
