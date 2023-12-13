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
increaseUptime();

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
      { figmaID: id },
      { asChanged: false, isOkToDownload: true }
    ).then((oneDesign) => {
      console.log(oneDesign);
      console.log(oneDesign.asChanged);
      res.json(oneDesign);
    });
  } catch (error) {
    console.log("erreur", error);
  }
});

router.get("/:id/change", async (req, res) => {
  const { id } = req.params;
 // console.log("l'id", id);
  uptime = 0;
 // console.log("uptime", uptime);
  try {
    const oneDesign = await Design.findOne({ figmaID: id });
    // console.log(oneDesign);
    //console.log(oneDesign.asChanged);
    res.json(oneDesign);
  } catch (error) {
    console.log("erreur", error);
  }
});

module.exports = router;
