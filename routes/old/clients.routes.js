const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Client = require("../models/Client.model");
const { isValidObjectId } = require("mongoose");
const isAdmin = require("../middlewares/isAdmin");
const HTML_TEMPLATE = require("../config/mailTemplate");
const SENDMAIL = require("../config/mail");
/**
 * ! This router is prefixed with /Client
 */

router.get("/", getAllClients);


router.get("/all", async (req, res, next) => {
  try {
    const allClients = await Client.find();
    res.json(allClients);
  } catch (error) {
    next(error);
  }
});

//! Create

// ! Read one
// Preventing from entering a route if we don't have something similar to an ObjectId:
// /:id([a-f0-9]{24})
router.get("/:id", async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    console.log("Not happening?");
    return res
      .status(400)
      .json({ message: `The id ${req.params.id} is not valid` });
  }
  try {
    const oneClient = await Client.findById(req.params.id);
    res.json(oneClient);
  } catch (error) {
    next(error);
  }
});

//todo Get gud
//? What is that?
//* Fancy

//! Delete
router.delete("/:id", async (req, res, next) => {
  console.log("got deletion request");
  try {
    const deletedThing = await Client.findByIdAndDelete(req.params.id);
    //console.log(deletedThing);
    if (!deletedThing) {
      return res.json({
        message: `Could not match any document with the id ${req.params.id}`,
      });
    }
    res.json({ message: `Deleted document with id ${req.params.id}` });
  } catch (bryan) {
    next(bryan);
  }
});

//! Update

// the path is: PATCH /api/Client/status/:id
router.patch(
  "/status/:id",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.json(updatedClient);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
