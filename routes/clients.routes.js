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

// Let's crud it
//! Read

router.get("/", getAllClients);

async function getAllClients(req, res, next) {
  //console.log("getting all clients");
  try {
    // throw Error("hoho..");
    const allClients = await Client.find();
    res.json(allClients);
  } catch (error) {
    next(error);
  }
}

//! Create

// router.post("/", async (req, res, next) => {
//   console.log("on veut creer un user");
//   try {
//     const { username, email, status } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: "Missing some informations" });
//     }

//     const sameUsername = await Client.findOne({ username: username });
//     if (sameUsername) {
//       return res
//         .status(400)
//         .json({ message: `Pseudo: ${username} is not available` });
//     }

//     const createdClient = await Client.create({
//       username: username,
//       email,
//       status,
//     });

//     newUserEmail(email, username);
//     res.status(201).json({
//       message: "We've just created something!",
//       Client: createdClient,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// function newUserEmail(email, username) {
//   const message = `Hi ! JRJRJ just created you an account that you can use ! <br />
//   <br />
//   The username is "${username}" <br />
//   <br />
//   Click on the link below to create you password <a href="www.google.fr">ici</a>`;
//   const options = {
//     from: "Framework. <frame-work@gmail.com>", // sender address
//     to: email, // receiver email
//     subject: "New account on Framework", // Subject line
//     text: message,
//     html: HTML_TEMPLATE(message),
//   };
//   // console.log(options);
//   SENDMAIL(options, (info) => {
//     console.log("Email sent successfully");
//     console.log("MESSAGE ID: ", info.messageId);
//   });
// }

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
