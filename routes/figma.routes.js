const Design = require("../models/Designs.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("We are live on /figma now we talk.");
});

router.get("/change", (req, res) => {
  let changeMade = Math.random() < 0.5;
  console.log("change made", changeMade);
  res.json(changeMade);
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
  console.log("l'id", id);

  try {
    const oneDesign = await Design.findOne({ figmaID: id });
    console.log(oneDesign);
    console.log(oneDesign.asChanged);
    res.json(oneDesign);
  } catch (error) {
    console.log("erreur", error);
  }


});

module.exports = router;
