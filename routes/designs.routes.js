const router = require("express").Router();
const Designs = require("../models/Designs.model");
const Client = require("../models/Client.model");
const uploader = require("../config/cloudinary");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/all", async (req, res, next) => {
  //console.log("admins asking all desings", req.user);
  try {
    const allDesigns = await Designs.find();
    res.json(allDesigns);
  } catch (error) {
    next(error);
  }
});

router.get("/owned", async (req, res, next) => {
  //console.log("user asking ", req.user);
  try {
    const allDesigns = await Designs.find({
      $or: [{ usedBy: req.user._id }, { creator: req.user._id }],
    });
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

// We receive the infos of the design in the req.body, and the id in the params.

router.post("/", uploader.single("picture"), async (req, res, next) => {
  console.log("Le body du req", req.body);
  try {
    const foundUser = await Client.find({ username: req.body.client });
    let pictureUrl;
    if (req.file) {
      pictureUrl = req.file.path;
    }

    console.log(
      "bonjoru le default text on va verfier ton type",
      req.body.defaultText,
      typeof req.body.defaultText
    );
    // const textValuesArray = req.body.defaultText.split(",");
    const textValuesArray = [];

    const createdDesigns = await Designs.create({
      name: req.body.name,
      picture: pictureUrl,
      creator: req.user._id,
      figmaID: req.body.figmaID,
      figmaNodeIDs: req.body.figmaNodeId,
      usedBy: foundUser,
      asChanged: false,
      numberOfTextEntries: req.body.numberOfTextEntries,
      textValues: Array.apply(
        null,
        Array(parseInt(req.body.numberOfTextEntries))
      ),
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

router.patch("/:id", uploader.single("picture"), async (req, res, next) => {
  console.log("i received a patch", req.body);

  let newPicture;
  if (req.file) {
    console.log("there is a picture", req.file.path);
    newPicture = req.file.path;
  }

  try {
    const { id } = req.params;
    let { newText } = req.body;
    newText = newText.split(",");
    console.log("newtext", newText);

    const updatedDesign = await Designs.findByIdAndUpdate(
      id,
      {
        textValues: newText,
        asChanged: true,
        isOkToDownload: false,
        picture: newPicture,
      },
      { new: true }
    );
    console.log(updatedDesign);
    console.log("the body", req.body, "the param", req.params);

    let numberOfTry = 0;
    async function checkIsChangeDone() {
      const isDesignEditionDone = await Designs.findById(id);

      if (isDesignEditionDone.isOkToDownload) {
        console.log("you can download", isDesignEditionDone);
        await Designs.findByIdAndUpdate(id, { isOkToDownload: false });
        res.json(isDesignEditionDone);
      } else {
        console.log("you cant download yet");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        numberOfTry++;
        if (numberOfTry < 11) {
          checkIsChangeDone();
        } else {
          next();
        }
      }
    }

    checkIsChangeDone();
  } catch (error) {
    next(error);
  }
});

// Add some userId in the usedBy field
// router.patch("/:duckId/:clientId", async (req, res, next) => {
//   try {
//     const { duckId, clientId } = req.params;
//     const updatedDuck = await Designs.findByIdAndUpdate(
//       duckId,
//       {
//         $push: { usedBy: clientId },
//       },
//       { new: true }
//     );
//     res.json(updatedDuck);
//   } catch (error) {
//     next(error);
//   }
// });

//Delete design by ID
router.delete("/:id", async (req, res, next) => {
  console.log("shloud delete", req.params.id);
  try {
    const deletedThing = await Designs.findByIdAndDelete(req.params.id);
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
module.exports = router;
