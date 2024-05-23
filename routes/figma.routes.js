const Design = require("../models/Designs.model");
const Element = require("../models/Element.model"); // Make sure to adjust the path based on your project structure
const Image = require("../models/BrandImages.model"); // Import your Mongoose model
const uploader = require("../config/cloudinary");
const uploadImagesToCloudinary = require("../middlewares/uploadImagesToCloudinary");
const cloudinary = require("cloudinary").v2;

const router = require("express").Router();

const HTML_TEMPLATE = require("../config/mailTemplate");
const SENDMAIL = require("../config/mail");

// UPTIME

let uptime = 0;

function increaseUptime() {
  //uptime++;
  if (uptime != 0 && uptime % 10 == 0) {
    console.log("10seconds without request from plugin");
  }
  checkIfDown();
  setTimeout(increaseUptime, 1000);
}
increaseUptime();

function checkIfDown() {
  if (uptime == 60) {
    console.log("Problem with the plugin !!!!");
    const message = `Hi ! It looks like the plugin isn't sending request anymore ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: "Framework. <frame-work@gmail.com>", // sender address
      to: "damien.audrezet@icloud.com", // receiver email
      subject: "Problem with plugin 1minutes down", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
  }
  if (uptime == 600) {
    console.log("Problem with the plugin !!!!");
    const message = `Hi ! It looks like the plugin isn't sending request anymore it's been 10 minutes ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: "Framework. <frame-work@gmail.com>", // sender address
      to: "damien.audrezet@icloud.com", // receiver email
      subject: "Problem with plugin 10minutes", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
  }
  if (uptime == 1800) {
    console.log("Problem with the plugin !!!!");
    const message = `Hi ! It looks like the plugin isn't sending request anymore it's been 30 minutes ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: "Framework. <frame-work@gmail.com>", // sender address
      to: "damien.audrezet@icloud.com", // receiver email
      subject: "Problem with plugin LAST WARNING", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // console.log(options);
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
  }
}

function sendErrorEmail() {
  const message = `Hi ! It looks like an error occured ! <br /> 
  <br /> 
  
  <br /> `;
  const options = {
    from: "Framework. <frame-work@gmail.com>", // sender address
    to: "damien.audrezet@icloud.com", // receiver email
    subject: "Problem with backend/plugin", // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
  };
  // console.log(options);
  SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
}
// ROUTES

router.get("/", (req, res) => {
  res.json("We are live on /figma now we talk.");
});

router.get("/error", (req, res) => {
  //sendErrorEmail();
  res.json("Mail sent");
});

router.post("/:id/changeApplied", async (req, res) => {
  const { id } = req.params;

  console.log("merci la street");
  try {
    const oneDesign = await Design.findOneAndUpdate(
      { FigmaFileKey: id },
      { hasChanged: false, isOkToDownload: true }
    ).then((oneDesign) => {
      console.log(oneDesign);
      console.log(oneDesign.hasChanged);
      res.json(oneDesign);
    });
  } catch (error) {
    console.log("erreur", error);
  }
});

router.get("/:id/change", async (req, res) => {
  // console.log("Someone is trying to retrieve the change");
  const { id } = req.params;
  uptime = 0;

  try {
    const oneDesign = await Design.findOne({ FigmaFileKey: id });

    if (oneDesign) {
      res.json(oneDesign);
    } else {
      // Design not found
      res.status(404).json({ message: "Design not found" });
    }
  } catch (error) {
    console.error("Error while retrieving the change:", error);
    //sendErrorEmail();
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", uploadImagesToCloudinary, async (req, res) => {
  //console.log("Route pour creer depuis plugin", req.body);
  //console.log("le figma file key", req.body.FigmaFileKey);
  console.log("After middleware, here is the ", req.body);
  try {
    // Vérifier si un design avec le même FigmaFileKey existe déjà
    const existingDesign = await Design.findOne({
      FigmaFileKey: req.body.FigmaFileKey,
    });

    // console.log(existingDesign);
    if (existingDesign) {
      // Un design avec le même FigmaFileKey existe déjà

      console.log("un design existe deja");
      return res.status(400).json({
        error: "Un design avec le même FigmaFileKey existe déjà.",
      });
    }

    // Créer un nouveau Design document en utilisant les données du corps de la requête
    const newDesign = new Design({
      FigmaName: req.body.FigmaName,
      FigmaFileKey: req.body.FigmaFileKey,
      FigmaId: req.body.FigmaId,
      sections: req.body.sections,
      images: req.body.images,
      variables: req.body.variables,
      usedBy: req.body.usedBy._id,
    });

    console.log("bonjour");

    // Sauvegarder le nouveau document dans la base de données
    const savedDesign = await newDesign.save();
    console.log(savedDesign);
    res.status(201).json(savedDesign);
  } catch (error) {
    console.error("Error creating design:", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création du design",
    });
  }
});

router.post("/update", async (req, res) => {
  console.log("Route pour creer depuis plugin", req.body);
  console.log("le figma file key", req.body.FigmaFileKey);

  try {
    // Vérifier si un design avec le même FigmaFileKey existe déjà
    const designToUpdate = await Design.findOne({
      FigmaFileKey: req.body.FigmaFileKey,
    });

    // console.log(existingDesign);
    if (!designToUpdate) {
      // Un design avec le même FigmaFileKey existe déjà

      console.log("Le deisng n'existe pas");
      return res.status(400).json({
        error: "Le design n'existe pas.",
      });
    }

    // Mettre à jour les propriétés du design avec les données du corps de la requête
    designToUpdate.FigmaName = req.body.FigmaName;
    designToUpdate.FigmaFileKey = req.body.FigmaFileKey;
    designToUpdate.FigmaId = req.body.FigmaId;
    designToUpdate.sections = req.body.sections;
    designToUpdate.images = req.body.images;
    designToUpdate.variables = req.body.variables;
    designToUpdate.usedBy = req.body.usedBy._id;

    // Sauvegarder les modifications dans la base de données
    const updatedDesign = await designToUpdate.save();

    res.status(201).json(updatedDesign);
  } catch (error) {
    console.error("Error updating design:", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'update du design",
    });
  }
});

router.post("/createBrand", async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);

    // Check if an element with the same figmaid exists
    const existingElement = await Element.findOne({
      FigmaId: req.body.FigmaId,
    });

    if (existingElement) {
      // If an element with the same figmaid exists, update its data
      await Element.updateOne({ FigmaId: req.body.FigmaId }, req.body);
      console.log("Updated existing element with figmaid:", req.body.FigmaId);
    } else {
      // If not, create a new element with the provided data
      const savedElement = await Element.create(req.body);
      console.log("Created new element with figmaid:", req.body.FigmaId);
    }

    res.json({ success: true, message: "Data processed successfully" });
  } catch (error) {
    console.error("An error occurred while processing data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/:figmaId/gettingImagesURL", async (req, res) => {
  const { figmaId } = req.params;

  try {
    console.log("For Figma ID:", figmaId);
    console.log("Received data from frontend:", req.body);

    // Check if an image document with the same figmaId exists
    const existingImage = await Image.findOne({ figmaId });

    if (existingImage) {
      // If an image document with the same figmaId exists, update its data
      await Image.updateOne({ figmaId }, { $set: { images: req.body.images } });
      console.log("Updated existing image with figmaId:", figmaId);
    } else {
      // If not, create a new image document with the provided data
      const newImage = new Image({
        figmaId,
        FigmaName: req.body.FigmaName,
        images: req.body.images,
      });
      // Save the new image to the database
      await newImage.save();
      console.log("Created new image with figmaId:", figmaId);
    }

    res.json({ success: true, message: "Data processed successfully" });
  } catch (error) {
    console.error("An error occurred while processing data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/uploadImgURL", async (req, res, next) => {
  // Array of image URLs for testing
  //let imageUrls = req.body;
  let imageUrls = [
    "https://images.vat19.com/covers/large/mini-circus-clown-bike.jpg",
    "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a7194436-6812-4f51-887d-fb2f8529fef2",
  ];
  // let imageUrls =
  //   "https://images.vat19.com/covers/large/mini-circus-clown-bike.jpg";

  // Normalize the input to always be an array
  if (!Array.isArray(imageUrls)) {
    imageUrls = [imageUrls];
  }
  try {
    // Use Promise.all to upload multiple images concurrently
    const uploadPromises = imageUrls.map((url) =>
      cloudinary.uploader.upload(url, {
        folder: "framework",
        allowed_formats: ["jpg", "png", "gif", "webp", "jpeg"],
      })
    );

    const results = await Promise.all(uploadPromises);

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;
