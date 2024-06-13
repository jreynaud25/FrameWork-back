import { NextFunction, Request, Response } from 'express';
import { Design } from '../models/design.figma.model';

export class DesignController {
  private designRepository = Design

  async getAllDesigns() {
    try {
      return await this.designRepository.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
