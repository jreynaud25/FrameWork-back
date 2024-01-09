const Design = require("../models/Designs.model");
const router = require("express").Router();

const HTML_TEMPLATE = require("../config/mailTemplate");
const SENDMAIL = require("../config/mail");

// UPTIME

let uptime = 0;

function increaseUptime() {
  uptime++;
  checkIfDown();
  setTimeout(increaseUptime, 1000);
}
//increaseUptime();

function checkIfDown() {
  if (uptime == 10) {
    console.log("Probleme with the plugin !!!!");
    const message = `Hi ! It looks like the plugin isn't sending request anymore ! <br /> 
  <br /> 
  
  <br /> `;
    const options = {
      from: "Framework. <frame-work@gmail.com>", // sender address
      to: "damien.audrezet@icloud.com", // receiver email
      subject: "Probleme with plugin", // Subject line
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

// ROUTES

router.get("/", (req, res) => {
  res.json("We are live on /figma now we talk.");
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
  const { id } = req.params;
  uptime = 0;
  try {
    const oneDesign = await Design.findOne({ FigmaFileKey: id });
    res.json(oneDesign);
  } catch (error) {
    console.log("erreur", error);
  }
});

router.post("/create", async (req, res) => {
  console.log("Route pour creer depuis plugin", req.body);
  console.log("le figma file key", req.body.FigmaFileKey);

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

module.exports = router;
