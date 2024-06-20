import { Router } from 'express';
import { FigmaController } from '../controllers/figma.controller';
import { CheckRoutesInterface, HTTPMethods } from '../interfaces/route.interface';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { uploadImagesToCloudinaryForBrand } from '../middlewares/uploadImagesToCloudinaryForBrand';
// import { testMiddle } from "../middlewares/testMiddle";

const figmaController = new FigmaController();

export const FigmaRoutes: CheckRoutesInterface<FigmaController> = [
  {
    method: HTTPMethods.POST,
    path: '/api/figma/createBrand',
    controller: figmaController,
    action: 'postCreateBrand',
    middlewares: [],
  },
  {
    method: HTTPMethods.POST,
    path: `/api/figma/:figmaFileKey/savingImgURL`,
    controller: figmaController,
    action: 'savingImgUrl',
    middlewares: [uploadImagesToCloudinaryForBrand],
  },
];
