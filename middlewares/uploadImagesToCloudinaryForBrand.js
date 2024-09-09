const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImagesToCloudinaryForBrand = async (req, res, next) => {
  try {
    const { images } = req.body;

    // Iterate over the images
    for (const [imageName, imageData] of Object.entries(images)) {
      // console.log(imageName, imageData);
      const { ids, url } = imageData;

      //Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(url, {
        folder: "framework",
        allowed_formats: ["jpg", "png", "gif", "webp", "jpeg"],
        public_id: imageName, // You can set the public_id here if needed
      });

      //Replace the original URL with the Cloudinary URL in the req.body

      images[imageName].url = result.secure_url;
    }

    // Move to the next middleware

    //console.log("Now the req.body", req.body);
    next();
  } catch (error) {
    // Handle errors
    console.error("Error uploading images to Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = uploadImagesToCloudinaryForBrand;
