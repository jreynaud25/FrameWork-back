import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Brand } from '../models/brand.model';
import { Design } from '../models/design.model';
import { Image } from '../models/image.model';

export class FigmaController {
  async home(req: Request, res: Response) {
    res.json('We are live on /figma now we talk.');
  }

  async error(req: Request, res: Response) {
    //sendErrorEmail();
    res.json('Mail sent');
  }
  async createTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      // Créer un nouveau Design document en utilisant les données du corps de la requête
      const newDesign = new Design({
        FigmaName: req.body.FigmaName,
        FigmaFileKey: req.body.FigmaFileKey,
        FigmaId: req.body.FigmaId,
        sections: req.body.sections,
        images: req.body.images,
        variables: req.body.variables,
        usedBy: req.body.usedBy._id,
      });

      console.log('bonjour');

      // Sauvegarder le nouveau document dans la base de données
      const savedDesign = await newDesign.save();
      console.log(savedDesign);
      res.status(201).json(savedDesign);
    } catch (error) {
      console.error('Error creating design:', error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la création du design",
      });
    }
  }
  async createGuidelines(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Received data from frontend:', req.body);
      const existingElement = await Brand.findOne({
        FigmaId: req.body.FigmaId,
      });
      if (existingElement) {
        await Brand.updateOne({ FigmaId: req.body.FigmaId }, req.body);
        console.log('Updated existing element with figmaid:', req.body.FigmaId);
      } else {
        await Brand.create(req.body);
        console.log('Created new element with figmaid:', req.body.FigmaId);
      }
      return { success: true, message: 'Data processed successfully' };
    } catch (error: unknown) {
      next(error); // Pass the error to the centralized error handler
    }
  }

  async getChange(req: Request, res: Response, next: NextFunction) {
    console.log('Get Change');
    const { id } = req.params;
    try {
      const oneDesign = await Design.findOne({ FigmaFileKey: id });
      //console.log('oneDesign', oneDesign);
      if (oneDesign) {
        console.log('Design found');
        res.json(oneDesign);
      } else {
        console.log('Design not found');
        res.status(404).json({ message: 'Design not found' });
      }
    } catch (error) {
      console.error('Error while retrieving the change:', error);
      //sendErrorEmail();
      next(error);
    }
  }
  async changeApplied(req: Request, res: Response) {
    console.log('changeApplied');
    const { id } = req.params;
    try {
      const oneDesign = await Design.findOneAndUpdate(
        { FigmaFileKey: id },
        { hasChanged: false, isOkToDownload: true }
      );
      res.json(oneDesign);
    } catch (error) {
      console.log('erreur', error);
      res.json({ message: 'Internal server error' });
    }
  }

  async updateDesign(req: Request, res: Response) {
    try {
      const designToUpdate = await Design.findOne({
        FigmaFileKey: req.body.FigmaFileKey,
      });

      if (!designToUpdate) {
        return res.status(400).json({
          error: "Le design n'existe pas.",
        });
      }

      designToUpdate.FigmaName = req.body.FigmaName;
      designToUpdate.FigmaFileKey = req.body.FigmaFileKey;
      designToUpdate.FigmaId = req.body.FigmaId;
      designToUpdate.sections = req.body.sections;
      designToUpdate.images = req.body.images;
      designToUpdate.variables = req.body.variables;
      designToUpdate.usedBy = req.body.usedBy._id;

      const updatedDesign = await designToUpdate.save();

      res.status(201).json(updatedDesign);
    } catch (error) {
      console.error('Error updating design:', error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de l'update du design",
      });
    }
  }

  async gettingImagesURL(req: Request, res: Response) {
    const { figmaId } = req.params;

    try {
      console.log('For Figma ID:', figmaId);

      const existingImage = await Image.findOne({ figmaId });

      if (existingImage) {
        await Image.updateOne({ figmaId }, { $set: { images: req.body.images } });
        console.log('Updated existing image with figmaId:', figmaId);
      } else {
        const newImage = new Image({
          figmaId,
          FigmaName: req.body.FigmaName,
          images: req.body.images,
        });
        await newImage.save();
        console.log('Created new image with figmaId:', figmaId);
      }

      res.json({ success: true, message: 'Data processed successfully' });
    } catch (error) {
      console.error('An error occurred while processing data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async uploadImgURL(req: Request, res: Response) {
    let imageUrls = [
      'https://images.vat19.com/covers/large/mini-circus-clown-bike.jpg',
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a7194436-6812-4f51-887d-fb2f8529fef2',
    ];

    if (!Array.isArray(imageUrls)) {
      imageUrls = [imageUrls];
    }
    try {
      const uploadPromises = imageUrls.map((url) =>
        cloudinary.v2.uploader.upload(url, {
          folder: 'framework',
          allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
        })
      );

      const results = await Promise.all(uploadPromises);

      res.json({ success: true, results });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ success: false, error: errorMessage });
    }
  }
}
