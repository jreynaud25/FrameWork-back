import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { ReturnFromFigma, fetchFigmaApi } from '../utils/fetchFigma';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImagesToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  const { sections, FigmaFileKey } = req.body;

  if (!sections || !Array.isArray(sections)) {
    return res.status(400).json({
      error: 'Sections must be an array.',
    });
  }

  let frameIds = [];
  for (let section of sections) {
    for (let frame of section.frames) {
      frameIds.push(frame.frameId);
    }
  }

  const idString = frameIds.join(',');
  try {
    const data: ReturnFromFigma = await fetchFigmaApi(`${FigmaFileKey}?ids=${idString}&scale=1&format=png`);
    const uploadPromises = Object.entries(data.images).map(async ([id, url]) => {
      const result = await cloudinary.uploader.upload(url, {
        folder: 'framework',
        allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
        public_id: id,
      });
      return { frameId: id, url: result.secure_url };
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Create a map of frameId to Cloudinary URL
    const urlMap: { [id: string]: string } = {};
    uploadResults.forEach((result) => {
      urlMap[result.frameId] = result.url;
    });

    // Append the Cloudinary URLs to the corresponding frames
    for (let section of sections) {
      for (let frame of section.frames) {
        if (urlMap[frame.frameId]) {
          frame.thumbnailURL = urlMap[frame.frameId];
        }
      }
    }

    next();
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    res.status(500).json({
      error: 'An error occurred while uploading images to Cloudinary',
    });
  }
};
