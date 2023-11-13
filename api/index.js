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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Authorize everyone
// app.use(cors())
// Authorize just our frontend
app.use(
  cors({
    //origin: process.env.FRONTEND_URL,
  })
);

// app.get("/", (req, res) => {
//   const path = `/item/${v4()}`;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   res.setHeader("Content-Type", "text/html");
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get("/item/:slug", (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

// Here we are importing the index router
// All the request are handled in the subsequent routes
app.use("/api", require("../routes/index.routes"));

app.use("*", (req, res, next) => {
  res.status(200).json({ message: "That's a 404 right here..." });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Cast error",
      details: "Make sure you are sending correct informations",
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

/**
 * Quick example of middlewares
 */
// app.use(logger);

// app.get("/", (req, res, next) => {
// 	res.json(req.cat);
// });

// app.get("/test", modifytheRequest, (req, res, next) => {
// 	res.json(req.cat);
// });

/**
 *
 * ! Traffic handler
 *
 * ? HEALTHCHECK
 * GET /api
 *
 * ? CLIENTS ROUTES
 * GET /api/client  List of all clients
 * GET /api/client/:id   One client
 * POST /api/client   Create a client
 * PATCH /api/client/:id   Update a client
 * DELETE /api/client/:id   Delete a client
 *
 * ? DESIGNS ROUTES
 * GET /api/Designs
 * GET /api/Designs/:id
 * POST /api/Designs
 * PATCH /api/Designs/:id
 * DELETE /api/Designs/:id
 *
 * ? CATCH EM ALL (404)
 * ANY  respond with a 404
 *
 * ? Error Handler
 */

// function modifytheRequest(req, res, next) {
// 	req.cat = { name: "Illiu" };
// 	next();
// }

// function logger(req, res, next) {
// 	console.log(`Making a request on ${req.path}`);
// 	next();
// }
