import { Router } from "express";
import { RoutesInterface } from "../interfaces/route.interface";
import { ClientRoutes } from "./client.routes";
//import isAuthenticated from "../middlewares/isAuthenticated"
export class Routes {
  public readonly routes: RoutesInterface;

  constructor() {
    this.routes = [...ClientRoutes];
  }
}
