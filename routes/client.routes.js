"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const client_controller_1 = require("../controllers/client.controller");
const route_interface_1 = require("../interfaces/route.interface");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
// import { testMiddle } from "../middlewares/testMiddle";
const clientController = new client_controller_1.ClientController();
exports.ClientRoutes = [
    {
        method: route_interface_1.HTTPMethods.GET,
        path: '/api/client/',
        controller: clientController,
        action: 'getAllClients',
        middlewares: [isAuthenticated_1.isAuthenticated],
    },
    {
        method: route_interface_1.HTTPMethods.GET,
        path: '/api/client/all',
        controller: clientController,
        action: 'getAllUsers',
        middlewares: [],
    },
    {
        method: route_interface_1.HTTPMethods.GET,
        path: '/api/client/:id',
        controller: clientController,
        action: 'getUserById',
        middlewares: [],
    },
    {
        method: route_interface_1.HTTPMethods.DELETE,
        path: '/api/client/:id',
        controller: clientController,
        action: 'deleteUserById',
        middlewares: [],
    },
    {
        method: route_interface_1.HTTPMethods.PATCH,
        path: '/api/client/:id',
        controller: clientController,
        action: 'patchUserById',
        middlewares: [],
    },
];
