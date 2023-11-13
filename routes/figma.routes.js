const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("We are live on /figma now we talk.");
});

router.get("/change", (req, res) => {
  let changeMade = Math.random() < 0.5;
  console.log("change made", changeMade);
  res.json(changeMade);
});

module.exports = router;
