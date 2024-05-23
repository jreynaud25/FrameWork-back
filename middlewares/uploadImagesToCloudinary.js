const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImagesToCloudinary = async (req, res, next) => {
  const { sections, FigmaFileKey } = req.body;

  if (!sections || !Array.isArray(sections)) {
    return res.status(400).json({
      error: "Sections must be an array.",
    });
  }

  let frameIds = [];
  for (let section of sections) {
    for (let frame of section.frames) {
      frameIds.push(frame.frameId);
    }
  }

  const idString = frameIds.join(",");

  try {
    const response = await fetch(
      `https://api.figma.com/v1/images/${FigmaFileKey}?ids=${idString}&scale=1&format=png`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Figma-Token": process.env.FIGMA_TOKEN,
        },
      }
    );

    const data = await response.json();
    const imageUrls = data.images;

    // Use Promise.all to upload multiple images concurrently
    const uploadPromises = Object.entries(imageUrls).map(([id, url]) => {
      const imageName = id.replace(":", "_"); // Replace ':' with '_' to ensure valid public_id
      return cloudinary.uploader
        .upload(url, {
          folder: "framework",
          allowed_formats: ["jpg", "png", "gif", "webp", "jpeg"],
          public_id: imageName,
        })
        .then((result) => ({ frameId: id, url: result.secure_url }));
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
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    res.status(500).json({
      error: "An error occurred while uploading images to Cloudinary",
    });
  }
};

module.exports = uploadImagesToCloudinary;
