"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImagesToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fetchFigma_1 = require("../utils/fetchFigma");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadImagesToCloudinary = async (req, res, next) => {
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
        const data = await (0, fetchFigma_1.fetchFigmaApi)(`${FigmaFileKey}?ids=${idString}&scale=1&format=png`);
        const uploadPromises = Object.entries(data.images).map(async ([id, url]) => {
            const result = await cloudinary_1.v2.uploader.upload(url, {
                folder: 'framework',
                allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
                public_id: id,
            });
            return { frameId: id, url: result.secure_url };
        });
        const uploadResults = await Promise.all(uploadPromises);
        // Create a map of frameId to Cloudinary URL
        const urlMap = {};
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
    }
    catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        res.status(500).json({
            error: 'An error occurred while uploading images to Cloudinary',
        });
    }
};
exports.uploadImagesToCloudinary = uploadImagesToCloudinary;
