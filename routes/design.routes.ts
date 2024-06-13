import { Router } from 'express';
import { DesignController } from '../controllers/design.controller';
import { CheckRoutesInterface, HTTPMethods } from '../interfaces/route.interface';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const designController = new DesignController();

export const DesignRoutes: CheckRoutesInterface<DesignController> = [
  {
    method: HTTPMethods.GET,
    path: '/api/design/all',
    controller: designController,
    action: 'getAllDesigns',
    middlewares: [],
  },
];
