"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const client_routes_1 = require("./client.routes");
const design_routes_1 = require("./design.routes");
//import isAuthenticated from "../middlewares/isAuthenticated"
class Routes {
    routes;
    constructor() {
        this.routes = [...client_routes_1.ClientRoutes, ...design_routes_1.DesignRoutes];
    }
}
exports.Routes = Routes;
