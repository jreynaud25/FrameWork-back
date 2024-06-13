import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Client } from '../models/client.model';

export class ClientController {
  private clientRepository = new Client().getClientModel();

  async getAllClients(_req: Request, res: Response, next: NextFunction) {
    try {
      return await this.clientRepository.find({ status: { $ne: 'admin' } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      return await this.clientRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('getUserById');
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`The id ${req.params.id} is not valid`);
      }
      return await this.clientRepository.findById(req.params.id);
    } catch (error) {
      console.log('there is a catch');
      throw error;
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedThing = await this.clientRepository.findByIdAndDelete(req.params.id);
      if (!deletedThing) {
        throw new Error(`Could not match any document with the id ${req.params.id}`);
      }
     return { message: `Deleted document with id ${req.params.id}, ${deletedThing}` };
    } catch (error) {
      throw error;
    }
  }

  async patchUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedClient = await this.clientRepository.findByIdAndUpdate(id, { status }, { new: true });
      res.json(updatedClient);
    } catch (error) {
      throw error;
    }
  }
}
