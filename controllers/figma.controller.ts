import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

export class FigmaController {
  async postCreateBrand(_req: Request, res: Response, next: NextFunction) {
    console.log('here is post create brand', _req.body);
    try {
      return 'salut';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
