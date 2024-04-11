const router = require("express").Router();
const Element = require("../models/Element.model");
const Image = require("../models/BrandImages.model");
/**
 * ! This router is prefixed with /Brand
 */

router.get("/all", async (req, res, next) => {
  try {
    // Fetch all documents from the Element collection
    const allElements = await Element.find();

    // Fetch all documents from the Image collection
    const allImages = await Image.find();
    // Combine the results and send them as a response
    res.json({ elements: allElements, images: allImages });
  } catch (error) {
    next(error);
  }
});

router.get("/:figmaName", async (req, res, next) => {
  console.log("bonjour le ", req.params.figmaName);
  try {
    // Get the figmaName parameter from the request
    const figmaName = req.params.figmaName;

    // Fetch all documents from the Element collection with the specified figmaName
    const allElements = await Element.find({ FigmaName: figmaName });

    // Fetch all documents from the Image collection
    const allImages = await Image.find({ FigmaName: figmaName });

    // Check if no elements or images are found
    if (allElements.length === 0 && allImages.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified figmaName" });
    }
    // Combine the results and send them as a response
    res.json({ elements: allElements, images: allImages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
