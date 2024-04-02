const router = require("express").Router();
const Element = require("../models/Element.model");

/**
 * ! This router is prefixed with /Brand
 */

router.get("/all", async (req, res, next) => {
  try {
    const allBrands = await Element.find();
    res.json(allBrands);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
