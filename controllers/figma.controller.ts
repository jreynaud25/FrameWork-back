import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

export class FigmaController {
  async postCreateBrand(_req: Request, res: Response, next: NextFunction) {
    console.log('here is post create brand', _req.body);
    try {
      // res.status(201).send('salut');
      console.log('salut');
      // throw _req.body;
      return _req.body;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async savingImgUrl(_req: Request, res: Response, next: NextFunction) {
    console.log('Hello saving img urls', _req.body);
    try {
      // res.status(201).send('salut');
      console.log('salut');
      // throw _req.body;
      return _req.body;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
