"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignController = void 0;
const client_model_1 = require("../models/client.model");
const design_figma_model_1 = require("../models/design.figma.model");
class DesignController {
    designRepository = design_figma_model_1.Design;
    clientRepository = client_model_1.Client;
    async getAllDesigns() {
        try {
            return await this.designRepository.find();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getOwnedDesign(req, res, next) {
        //console.log("user asking ", req.user);
        try {
            const allDesigns = await this.designRepository.find({
                $or: [{ usedBy: req.user._id }, { creator: req.user._id }],
            });
            res.json(allDesigns);
        }
        catch (error) {
            next(error);
        }
    }
    async createDesign(req, res, next) {
        //console.log("Le body du req", req.body);
        try {
            const foundUser = await this.clientRepository.find({ username: req.body.client });
            let pictureUrl;
            if (req.file) {
                pictureUrl = req.file.path;
            }
            const textValuesArray = [];
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DesignController = DesignController;
