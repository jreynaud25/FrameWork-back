// Middleware to check if the design already exists
const Design = require("../models/Designs.model");


const checkExistingDesign = async (req, res, next) => {
  try {
    // Check if the design already exists in the database
    const existingDesign = await Design.findOne({
      FigmaFileKey: req.body.FigmaFileKey,
    });

    if (existingDesign) {
      console.log('Existing design detected in middleware')
      return res.status(400).json({
        error: "A design with the same FigmaFileKey already exists.",
      });
    }

    // If the design doesn't exist, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error checking existing design:", error);
    res.status(500).json({
      error: "An error occurred while checking the existing design.",
    });
  }
};

module.exports = checkExistingDesign;
