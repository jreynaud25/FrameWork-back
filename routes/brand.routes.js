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

module.exports = router;
