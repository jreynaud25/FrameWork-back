"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const mongoose_1 = require("mongoose");
const client_model_1 = require("../models/client.model");
class ClientController {
    clientRepository = client_model_1.Client;
    async getAllClients(_req, res, next) {
        try {
            return await this.clientRepository.find({ status: { $ne: 'admin' } });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAllUsers(_req, res, next) {
        try {
            return await this.clientRepository.find();
        }
        catch (error) {
            throw error;
        }
    }
    async getUserById(req, res, next) {
        try {
            console.log('getUserById');
            if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
                throw new Error(`The id ${req.params.id} is not valid`);
            }
            return await this.clientRepository.findById(req.params.id);
        }
        catch (error) {
            console.log('there is a catch');
            throw error;
        }
    }
    async deleteUserById(req, res, next) {
        try {
            const deletedThing = await this.clientRepository.findByIdAndDelete(req.params.id);
            if (!deletedThing) {
                throw new Error(`Could not match any document with the id ${req.params.id}`);
            }
            return { message: `Deleted document with id ${req.params.id}, ${deletedThing}` };
        }
        catch (error) {
            throw error;
        }
    }
    async patchUserById(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedClient = await this.clientRepository.findByIdAndUpdate(id, { status }, { new: true });
            res.json(updatedClient);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ClientController = ClientController;
