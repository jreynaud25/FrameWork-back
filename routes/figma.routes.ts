import { Router } from 'express';
import { FigmaController } from '../controllers/figma.controller';
import { CheckRoutesInterface, HTTPMethods } from '../interfaces/route.interface';
import { checkExistingDesign } from '../middlewares/checkExistingDesign';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { uploadImagesToCloudinary } from '../middlewares/uploadImagesToCloudinary';
import { uploadImagesToCloudinaryForBrand } from '../middlewares/uploadImagesToCloudinaryForBrand';

const figmaController = new FigmaController();

export const FigmaRoutes: CheckRoutesInterface<FigmaController> = [
  {
    method: HTTPMethods.GET,
    path: '/',
    controller: figmaController,
    action: 'home',
    middlewares: [],
  },
  {
    method: HTTPMethods.GET,
    path: '/error',
    controller: figmaController,
    action: 'error',
    middlewares: [],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/figma/createTemplate',
    controller: figmaController,
    action: 'createTemplate',
    middlewares: [checkExistingDesign, uploadImagesToCloudinary],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/figma/createGuidelines',
    controller: figmaController,
    action: 'createGuidelines',
    middlewares: [],
  },

  {
    method: HTTPMethods.POST,
    path: '/api/figma/:id/changeApplied',
    controller: figmaController,
    action: 'changeApplied',
    middlewares: [],
  },
  {
    method: HTTPMethods.GET,
    path: '/api/figma/:id/change',
    controller: figmaController,
    action: 'getChange',
    middlewares: [],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/figma/update',
    controller: figmaController,
    action: 'updateDesign',
    middlewares: [],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/figma/:figmaId/gettingImagesURL',
    controller: figmaController,
    action: 'gettingImagesURL',
    middlewares: [uploadImagesToCloudinaryForBrand],
  },
  {
    method: HTTPMethods.POST,
    path: '/api/figma/uploadImgURL',
    controller: figmaController,
    action: 'uploadImgURL',
    middlewares: [],
  },
];
