const router = require("express").Router();
const Designs = require("../models/Designs.model");
const Client = require("../models/Client.model");
const uploader = require("../config/cloudinary");
const isAuthenticated = require("../middlewares/isAuthenticated");
const cloudinary = require("cloudinary").v2;


const HTML_TEMPLATE = require("../config/mailTemplate");
const SENDMAIL = require("../config/mail");

router.get("/all", async (req, res, next) => {
  //console.log("admin asking all desings", req.user);
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

// We receive the infos of the design in the req.body, and the id in the params.

router.post("/", uploader.single("picture"), async (req, res, next) => {
  try {
    const foundUser = await Client.find({ username: req.body.client });
    let pictureUrl;
    if (req.file) {
      pictureUrl = req.file.path;
    }
    const textValuesArray = [];

    const createdDesigns = await Designs.create({
      name: req.body.name,
      picture: pictureUrl,
      creator: req.user._id,
      figmaID: req.body.figmaID,
      figmaNodeIDs: req.body.figmaNodeId,
      usedBy: foundUser,
      hasChanged: false,
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

router.patch("/:id/archiveURL", async (req, res) => {
  const { id } = req.params;
  const { selectedFrame, archiveURL } = req.body;

  console.log("salut je vais supprimer", archiveURL, selectedFrame, id);
  const updatedDesign = await Designs.findOneAndUpdate(
    {
      _id: id,
      "sections.frames.frameId": selectedFrame.frameId,
    },
    {
      $pull: {
        "sections.$.frames.$[elem].archiveURL": archiveURL,
      },
    },
    {
      arrayFilters: [{ "elem.frameId": selectedFrame.frameId }],
      new: true, // Return the updated document
    }
  );

  //console.log("Kikou", updatedDesign);
  res.json("salut");
});

router.post("/:id", async (req, res, next) => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let dateString = currentDate.toLocaleDateString("en-US", options); // Convert date to string in ISO format
  dateString = dateString.replace(/\//g, "-");

  try {
    const { id } = req.params;
    const { thumbnailURL, selectedFrame, archive } = req.body;
    console.log("Bonjour, ", thumbnailURL, selectedFrame);
    console.log("selected", selectedFrame.sectionName, selectedFrame.frameName);
    // Update the thumbnailURL based on the selectedFrame's frameId

    const result = await cloudinary.uploader.upload(thumbnailURL, {
      folder: "framework",
      allowed_formats: ["jpg", "png", "gif", "webp", "jpeg"],
      public_id: `${dateString}-${selectedFrame.sectionName}-${selectedFrame.frameName}`,
    });
    const cloudinaryUrl = result.secure_url;

    if (archive) {
      console.log("Salut je vais archiver", thumbnailURL, selectedFrame);
      const updatedDesign = await Designs.findOneAndUpdate(
        {
          _id: id,
          "sections.frames.frameId": selectedFrame.frameId,
        },
        {
          $set: {
            "sections.$.frames.$[elem].thumbnailURL": cloudinaryUrl,
          },
          $push: {
            "sections.$.frames.$[elem].archiveURL": cloudinaryUrl,
          },
        },
        {
          arrayFilters: [{ "elem.frameId": selectedFrame.frameId }],
          new: true, // Return the updated document
        }
      );
    } else {
      console.log("no archive");
      const updatedDesign = await Designs.findOneAndUpdate(
        {
          _id: id,
          "sections.frames.frameId": selectedFrame.frameId,
        },
        {
          $set: {
            "sections.$.frames.$[elem].thumbnailURL": cloudinaryUrl,
          },
        },
        {
          arrayFilters: [{ "elem.frameId": selectedFrame.frameId }],
          new: true, // Return the updated document
        }
      );
    }

    if (result) {
      console.log("ThumbnailURL updated successfully:");

router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { thumbnailURL, selectedFrame } = req.body;
    console.log("Bonjour, ", thumbnailURL, selectedFrame);
    // Update the thumbnailURL based on the selectedFrame's frameId
    const result = await Designs.findOneAndUpdate(
      {
        _id: id,
        "sections.frames.frameId": selectedFrame.frameId,
      },
      {
        $set: {
          "sections.$.frames.$[elem].thumbnailURL": thumbnailURL,
        },
      },
      {
        arrayFilters: [{ "elem.frameId": selectedFrame.frameId }],
        new: true, // Return the updated document
      }
    );

    if (result) {
      console.log("ThumbnailURL updated successfully:", result);

      res.json({
        message: "ThumbnailURL updated successfully",
        design: result,
      });
    } else {
      console.log("Design not found or thumbnailURL not updated");
      res
        .status(404)
        .json({ error: "Design not found or thumbnailURL not updated" });
    }
  } catch (error) {
    console.error("Error updating thumbnailURL:", error);
    next(error);
  }
});

// Update Designs

router.patch("/:id", uploader.array("pictures"), async (req, res, next) => {
  console.log("i received a patch", req.body.newText[0]);
  console.log("req.files", req.files);
  const newTextArray = JSON.parse(req.body.newText);

  //console.log("Check the type of", typeof newTextArray);
  //console.log(newTextArray);
  newTextArray.forEach((item) => {
    // Access the data in each item
    //console.log(item);
  });

  try {
    const { id } = req.params;
    // let { newText } = req.body;
    // newText = newText.split(",");
    // console.log("newtext", newText);
    const existingDesign = await Designs.findById(id);
    const uploadedImages = req.files.map((file) => {
      return {
        type: "IMAGE",
        name: file.originalname, // Use "originalname" for the "name" field
        url: file.path, // Update "url" with the Cloudinary URL
        hasChanged: true,
      };
    });

    // Combine existing images with new images
    const updatedImages = existingDesign.images.map((existingImage) => {
      const matchingUpload = uploadedImages.find((upload) => {
        return upload.name === existingImage.name;
      });

      if (matchingUpload) {
        // If there's a matching upload, use the new image
        return matchingUpload;
      } else {
        // If there's no matching upload, keep the existing image
        return existingImage;
      }
    });
    const updatedDesign = await Designs.findByIdAndUpdate(
      id,
      {
        variables: newTextArray,
        hasChanged: true,
        // isOkToDownload: false,
        images: updatedImages,
      },
      { new: true }
    );
    // console.log(updatedDesign);


    let numberOfTry = 0;
    async function checkIsChangeDone() {
      const isDesignEditionDone = await Designs.findById(id);

      if (isDesignEditionDone.isOkToDownload) {
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

router.get("/notify/:id", async (req, res, next) => {
  console.log("Bonjour la notify ");
  try {
    const { id } = req.params;
    console.log(id);
    const userToNotify = await Client.findById(id);
    console.log(userToNotify);
    const message = `Hi ! A new design is available is your account ! <br /> 
<br /> 

<br /> `;
    const options = {
      from: "Framework. <frame-work@gmail.com>", // sender address
      to: userToNotify.email, // receiver email
      subject: "New design available !", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    res.json("sent");
  } catch (error) {
    res.json(error);
  }
});

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
  } catch (error) {
    next(error);
  }
});
module.exports = router;
