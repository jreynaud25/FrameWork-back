"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = async (req, res, next) => {
    try {
        if (req.user.status === "admin") {
            return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
    catch (error) {
        next(error);
    }
};
exports.isAdmin = isAdmin;
