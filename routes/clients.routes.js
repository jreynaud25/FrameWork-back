const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Client = require("../models/Client.model");
const { isValidObjectId } = require("mongoose");
const isAdmin = require("../middlewares/isAdmin");
/**
 * ! This router is prefixed with /Client
 */

// Let's crud it

//! Create

router.post("/", async (req, res, next) => {
  try {

    const { pseudonyme, email, status } = req.body;

    if (!pseudonyme || !email) {
      return res.status(400).json({ message: "Missing some informations" });
    }

    const samePseudo = await Client.findOne({ pseudo: pseudonyme });
    if (samePseudo) {
      return res
        .status(400)
        .json({ message: `Pseudo: ${pseudonyme} is not available` });
    }

    const createdClient = await Client.create({
      pseudo: pseudonyme,
      email,
      status,
    });
    res.status(201).json({
      message: "We've just created something!",
      Client: createdClient,
    });
  } catch (error) {
    next(error);
  }
});

//! Read

router.get("/", getAllClients);

async function getAllClients(req, res, next) {
  try {
    // throw Error("hoho..");
    const allClients = await Client.find();
    res.json(allClients);
  } catch (error) {
    next(error);
  }
}

// ! Read one
// Preventing from entering a route if we don't have something similar to an ObjectId:
// /:id([a-f0-9]{24})
router.get("/:id", async (req, res, next) => {
  // if (!isValidObjectId(req.params.id)) {
  // 	console.log("Not happening?");
  // 	return res
  // 		.status(400)
  // 		.json({ message: `The id ${req.params.id} is not valid` });
  // }
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

router.patch("/", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { email, status, pseudonyme } = req.body;
  try {
    const samePseudo = await Client.findOne({ pseudo: pseudonyme });
    const pseudoAgain = await Client.find({ pseudo: pseudonyme });
    //console.log("find:", pseudoAgain, "findOne:", samePseudo);
    if (samePseudo) {
      return res
        .status(400)
        .json({ message: `Pseudo: ${pseudonyme} is not available` });
    }
    const updatedClient = await Client.findByIdAndUpdate(
      req.user.id,
      { email, status, pseudo: pseudonyme },
      { new: true }
    );
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
});

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