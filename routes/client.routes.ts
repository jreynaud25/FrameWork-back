import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { CheckRoutesInterface, HTTPMethods } from '../interfaces/route.interface';
import { isAuthenticated } from '../middlewares/isAuthenticated';
// import { testMiddle } from "../middlewares/testMiddle";

const clientController = new ClientController();

export const ClientRoutes: CheckRoutesInterface<ClientController> = [
  {
    method: HTTPMethods.GET,
    path: '/api/client/',
    controller: clientController,
    action: 'getAllClients',
    middlewares: [isAuthenticated],
  },
  {
    method: HTTPMethods.GET,
    path: '/api/client/all',
    controller: clientController,
    action: 'getAllUsers',
    middlewares: [],
  },
  {
    method: HTTPMethods.GET,
    path: '/api/client/:id',
    controller: clientController,
    action: 'getUserById',
    middlewares: [],
  },
  {
    method: HTTPMethods.DELETE,
    path: '/api/client/:id',
    controller: clientController,
    action: 'deleteUserById',
    middlewares: [],
  },
  {
    method: HTTPMethods.PATCH,
    path: '/api/client/:id',
    controller: clientController,
    action: 'patchUserById',
    middlewares: [],
  },
];
