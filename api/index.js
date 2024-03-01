// require('dotenv/config')
require("dotenv").config();
// Connect to the database
require("../config/dbConfig");
// We need express
const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

// Need the app
const app = express();
// Configuration of the app
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Authorize everyone
app.use(cors());

// Here we are importing the index router
// All the requests are handled in the subsequent routes
app.use("/api", require("../routes/index.routes"));

app.use("*", (req, res, next) => {
  res.status(200).json({ message: "That's a 404 right here..." });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Cast error",
      details: "Make sure you are sending correct information",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }
  res.status(500).json({ error: err, message: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
