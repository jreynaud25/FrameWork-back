require("dotenv").config();
require("../config/dbConfig");

//SSL conf
const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(process.env.PORT, () =>
//   console.log(`Server running on https://localhost:${process.env.PORT}`)
// );

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
