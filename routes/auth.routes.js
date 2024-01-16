const router = require("express").Router();
const User = require("../models/Client.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 10;
const isAuthenticated = require("./../middlewares/isAuthenticated");
const HTML_TEMPLATE = require("../config/mailTemplate");
const SENDMAIL = require("../config/mail");
const uploader = require("../config/cloudinary");

function generatePassword() {
  const length = 10; // Longueur du mot de passe souhaitée
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?"; // Caractères autorisés
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
router.post("/signup", uploader.single("pictures"), async (req, res, next) => {
  console.log("Here is the req", req.body);
  console.log("Here is the req", req.body.username);
  console.log("Here is the req", req.body.email);
  let pictureUrl;
  if (req.file) {
    pictureUrl = req.file.path;
  }

  console.log("on a une url", pictureUrl);

  const password = generatePassword();

  try {
    // * Get the informations from the user input
    let { username, email } = req.body;
    username = username.toLowerCase().replace(/^"?(.*?)"?$/, "$1");
    // * Check if the user already exist
    const foundUser = await User.findOne({ username });
    if (!username || !email) {
      return res.status(400).json({ message: "Missing some informations" });
    }
    if (foundUser) {
      return res.status(400).json({ message: "User already exist." });
    }
    // * Password safety
    if (password.length < 6) {
      return res.status(400).json({ message: "Unsafe password" });
    }

    // * Generate the salt
    const generatedSalt = await bcrypt.genSalt(salt);
    // * Generate the hash for that password
    const hashedPass = await bcrypt.hash(password, generatedSalt);
    // * Should be safe to create the user.

    const createdUser = await User.create({
      username,
      email,
      pictureUrl,
      //! Please don't forget me. 🥹
      password: hashedPass,
    });
    //console.log(createdUser);
    newUserEmail(email, username, password);
    res
      .status(201)
      .json({ message: "Welcome' aboard young pirate!", createdUser });
  } catch (error) {
    next(error);
  }
});

function newUserEmail(email, username, password) {
  const message = `Hi ! JRJRJ just created you an account that you can use ! <br /> 
  <br /> 
  The username is "${username}" <br /> 
  The password is &quot;${password}&quot; <br />
  <br /> 
  Click  <a href="https://frame-work.app">here</a> to connect`;
  const options = {
    from: "Framework. <frame-work@gmail.com>", // sender address
    to: email, // receiver email
    subject: "New account on Framework", // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
  };
  // console.log(options);
  SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
}

router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase();

    const foundUser = await User.findOne({ username }).select(
      "password username"
    );
    if (!foundUser) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const samePassword = await bcrypt.compare(password, foundUser.password);
    if (!samePassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    //! This is where we setup what is going to be inside of the token
    const payload = { username: foundUser.username, _id: foundUser._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.json({ token: token });
  } catch (error) {
    next(error);
  }
});

router.post("/reset", async (req, res, next) => {
  let { username } = req.body;
  username = username.toLowerCase();

  console.log("shloud reset password for", username);
  try {
    console.log("shloud reset password for", username);
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const password = generatePassword();

    console.log("update with this password", password);

    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPass = await bcrypt.hash(password, generatedSalt);

    const newPassword = { password: hashedPass };
    const updatedClient = await User.findOneAndUpdate(
      { username },
      newPassword,
      {
        new: true,
      }
    );

    newUserEmail(updatedClient.email, updatedClient.username, password);
    res.json("coucou");
  } catch (error) {
    next(error);
  }
});

router.get("/me", isAuthenticated, async (req, res, next) => {
  res.json(req.user);
});

//! Update

router.patch("/update/:id", isAuthenticated, async (req, res, next) => {
  console.log("Must patch", req.body, req.params.id);
  let { username, password, email } = req.body;
  username = username.toLowerCase();

  console.log("bonjour", username, password, email);

  const id = req.params.id;
  try {
    // Define the update fields
    const updateFields = {};

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      console.log("il y a un mot de passe", password);
      const generatedSalt = await bcrypt.genSalt(salt);
      // Generate the hash for the provided password
      const hashedPass = await bcrypt.hash(password, generatedSalt);
      updateFields.password = hashedPass;
    }

    // Perform the update
    const updatedClient = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    console.log("le client update", updatedClient);
    res.json(updatedClient);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
