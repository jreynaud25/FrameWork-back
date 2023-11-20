const router = require("express").Router();
const Designs = require("../models/Designs.model");
const Client = require("../models/Client.model");
const uploader = require("../config/cloudinary");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/all", async (req, res, next) => {
  console.log("admins asking all desings", req.user);
  try {
    const allDesigns = await Designs.find();
    res.json(allDesigns);
  } catch (error) {
    next(error);
  }
});

router.get("/owned", async (req, res, next) => {
  console.log("users asking ", req.user);
  try {
    const allDesigns = await Designs.find({ usedBy: req.user._id });
    res.json(allDesigns);
  } catch (error) {
    next(error);
  }
});

// We receive the Designs infos and the name of the creator in the req.body
// router.post("/", async (req, res, next) => {
// 	try {
// 		console.log(req.body)
// 		const { name, picture, creator } = req.body
// 		const foundCreator = await Client.findOne({ pseudo: creator })
// 		if (!foundCreator) {
// 			return res
// 				.status(400)
// 				.json({ message: `Could not find any user with the name: ${creator}` })
// 		}
// 		const createdDuck = await Designs.create({
// 			name,
// 			picture,
// 			creator: foundCreator._id,
// 		})
// 		res.status(201).json(createdDuck)
// 	} catch (error) {
// 		next(error)
// 	}
// })

// We receive the infos of the duck in the req.body, and the id in the params.

router.post("/", uploader.single("picture"), async (req, res, next) => {
  try {
    //console.log(req);
    // console.log(req.file);
    // console.log(req.user);
    // console.log(req.figmaID);
    // const foundUser = await Client.findById(req.params.creatorId)
    // if (!foundUser) {
    // 	return res.status(400).json({
    // 		message: `Could not find any user with the id: ${req.params.creatorId}`,
    // 	})
    // }
    const foundUser = await Client.find({ username: req.body.client });
    //console.log(foundUser);
    let pictureUrl;
    if (req.file) {
      pictureUrl = req.file.path;
    }

    const createdDesigns = await Designs.create({
      name: req.body.name,
      picture: pictureUrl,
      creator: req.user._id,
      figmaID: req.body.figmaID,
      figmaNodeIDs: req.body.figmaNodeId,
      usedBy: foundUser,
      asChanged: false,
      numberOfTextEntries: req.body.numberOfTextEntries,
    });

    res.status(201).json(createdDesigns);
  } catch (error) {
    next(error);
  }
});

// Get one

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneDesign = await Designs.findById(id)
      .populate("creator", "pseudo")
      .populate("usedBy");
    res.json(oneDesign);
  } catch (error) {
    next(error);
  }
});

// Update Designs

// router.patch("/:id", uploader.single("picture"), async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     let newPicture;
//     if (req.file) {
//       newPicture = req.file.path;
//     }
//     //console.log("in the route");
//     //console.log(req.body, req.params);
//     const updatedDesign = await Designs.findByIdAndUpdate(
//       id,
//       { name, picture: newPicture },
//       { new: true }
//     );
//     //console.log(updatedDesign);
//     res.json(updatedDesign);
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/:id", async (req, res, next) => {
  console.log("i received a patch");
  try {
    const { id } = req.params;
    const { newText } = req.body;

    const updatedDesign = await Designs.findByIdAndUpdate(
      id,
      { textValues: req.body, asChanged: true },
      { new: true },
    );
    console.log(updatedDesign);
    console.log("the body", req.body, "the param", req.params);

    res.json(true);
  } catch (error) {
    next(error);
  }
});

// Add some userId in the usedBy field
router.patch("/:duckId/:clientId", async (req, res, next) => {
  try {
    const { duckId, clientId } = req.params;
    const updatedDuck = await Designs.findByIdAndUpdate(
      duckId,
      {
        $push: { usedBy: clientId },
      },
      { new: true }
    );
    res.json(updatedDuck);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
