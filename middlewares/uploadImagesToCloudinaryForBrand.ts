import { NextFunction } from 'express';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImagesToCloudinaryForBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { images } = req.body;
    for (const [imageName, imageData] of Object.entries(images)) {
      const { ids, url } = imageData;
      const result = await cloudinary.uploader.upload(url, {
        folder: 'framework',
        allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
        public_id: imageName, // You can set the public_id here if needed
      });
      images[imageName].url = result.secure_url;
    }
    next();
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = uploadImagesToCloudinaryForBrand;
