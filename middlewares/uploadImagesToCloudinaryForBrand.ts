import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from 'express';

type IntImages = { imageName: { ids: []; url: string } };
export const uploadImagesToCloudinaryForBrand = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Salut, je vais upload sur cloudinary');
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  try {
    const { images }: { images: IntImages } = req.body;
    for (const [imageName, imageData] of Object.entries(images)) {
      const result = await cloudinary.v2.uploader.upload(imageData.url, {
        folder: 'framework',
        allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
        public_id: imageName, // You can set the public_id here if needed
      });
      imageData.url = result.secure_url;
    }
    next();
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    next(error);
    // res.status(500).json({ error: 'Internal server error' });
  }
};
