import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Client } from "../models/client.model";

export class ClientController {

  private clientRepository = new Client().getClientModel()

  async getAllClients(_req: Request, res: Response, next: NextFunction) {
    try {
      return await this.clientRepository.find({ status: { $ne: "admin" } });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const allClients = await this.clientRepository.find();
      res.json(allClients);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    console.log("getUserById")
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ message: `The id ${req.params.id} is not valid` });
    }
    try {
      const oneClient = await this.clientRepository.findById(req.params.id);
      res.json(oneClient);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedThing = await this.clientRepository.findByIdAndDelete(req.params.id);
      if (!deletedThing) {
        return res.json({
          message: `Could not match any document with the id ${req.params.id}`,
        });
      }
      res.json({ message: `Deleted document with id ${req.params.id}` });
    } catch (error) {
      next(error);
    }
  }

  async patchUserById(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedClient = await this.clientRepository.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        res.json(updatedClient);
      } catch (error) {
        next(error);
      }
  }
}
