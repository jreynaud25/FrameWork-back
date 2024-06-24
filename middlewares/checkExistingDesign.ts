import { NextFunction } from 'express-serve-static-core';
import { Design } from '../models/design.model';

export const checkExistingDesign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as { FigmaFileKey?: string };
    if (!body || !body.FigmaFileKey) {
      return {
        error: 'FigmaFileKey is required.',
      };
    }

    // Check if the design already exists in the database
    const existingDesign = await Design.findOne({
      FigmaFileKey: body.FigmaFileKey,
    });

    if (existingDesign) {
      console.log('Existing design detected in middleware');
      return {
        error: 'A design with the same FigmaFileKey already exists.',
      };
    }

    // If the design doesn't exist, proceed to the next middleware

    next();
  } catch (error) {
    console.error('Error checking existing design:', error);
    return {
      error: 'An error occurred while checking the existing design.',
    };
  }
};
