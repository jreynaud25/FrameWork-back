import { NextFunction, Request, Response } from 'express';
import { Client } from '../models/client.model';
import { Design } from '../models/design.figma.model';

export class DesignController {
  private designRepository = Design;
  private clientRepository = Client;
  async getAllDesigns() {
    try {
      return await this.designRepository.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOwnedDesign(req: Request, res: Response, next: NextFunction) {
    //console.log("user asking ", req.user);
    try {
      const allDesigns = await this.designRepository.find({
        $or: [{ usedBy: req.user._id }, { creator: req.user._id }],
      });
      res.json(allDesigns);
    } catch (error) {
      next(error);
    }
  }

  async createDesign(req: Request, res: Response, next: NextFunction) {
    //console.log("Le body du req", req.body);
    try {
      const foundUser = await this.clientRepository.find({ username: req.body.client });
      let pictureUrl;
      if (req.body.file) {
        pictureUrl = req.body.file.path;
      }
      // const textValuesArray:[] = [];

      const createdDesigns = await this.designRepository.create({
        name: req.body.name,
        picture: pictureUrl,
        creator: req.user._id,
        figmaID: req.body.figmaID,
        figmaNodeIDs: req.body.figmaNodeId,
        usedBy: foundUser,
        hasChanged: false,
        numberOfTextEntries: req.body.numberOfTextEntries,
        textValues: Array.apply(null, Array(parseInt(req.body.numberOfTextEntries))),
      });

      res.status(201).json(createdDesigns);
    } catch (error) {
      next(error);
    }
  }
}
