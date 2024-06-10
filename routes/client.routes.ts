import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import {
  CheckRoutesInterface,
  HTTPMethods,
} from "../interfaces/route.interface";
import { testMiddle } from "../middlewares/testMiddle";
import { isAuthenticated } from "../middlewares/isAuthenticated";


const clientController = new ClientController();

export const ClientRoutes: CheckRoutesInterface<ClientController> = [
  {
    method: HTTPMethods.GET,
    path: "/api/client/all",
    controller: clientController,
    action: "getAllClients",
    middlewares: [ isAuthenticated ],
  },
];
