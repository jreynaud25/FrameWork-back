import { Router } from 'express';
//import { uploader } from '../config/cloudinary';
import { DesignController } from '../controllers/design.controller';
import { CheckRoutesInterface, HTTPMethods } from '../interfaces/route.interface';
import { isAuthenticated } from '../middlewares/isAuthenticated';
const uploader = require('../config/cloudinary');

const designController = new DesignController();

export const DesignRoutes: CheckRoutesInterface<DesignController> = [
  {
    method: HTTPMethods.GET,
    path: '/api/design/all',
    controller: designController,
    action: 'getAllDesigns',
    middlewares: [],
  },
  {
    method: HTTPMethods.GET,
    path: '/api/design/owned',
    controller: designController,
    action: 'getAllDesigns',
    middlewares: [],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/design/',
    controller: designController,
    action: 'createDesign',
    middlewares: [],
  },
];
