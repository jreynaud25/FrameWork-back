"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignRoutes = void 0;
//import { uploader } from '../config/cloudinary';
const design_controller_1 = require("../controllers/design.controller");
const route_interface_1 = require("../interfaces/route.interface");
const uploader = require("../config/cloudinary");
const designController = new design_controller_1.DesignController();
exports.DesignRoutes = [
    {
        method: route_interface_1.HTTPMethods.GET,
        path: '/api/design/all',
        controller: designController,
        action: 'getAllDesigns',
        middlewares: [],
    },
    {
        method: route_interface_1.HTTPMethods.GET,
        path: '/api/design/owned',
        controller: designController,
        action: 'getAllDesigns',
        middlewares: [],
    },
    {
        method: route_interface_1.HTTPMethods.POST,
        path: '/api/design/',
        controller: designController,
        action: 'createDesign',
        middlewares: [],
    },
];
