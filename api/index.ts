import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ModifierFlags } from "typescript";
import { RouteInterface } from "../interfaces/route.interface";
import { applyMiddlewares } from "../middlewares/applyMiddlewares";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Routes } from "../routes/index.routes";

dotenv.config();

const app = express();
const routes = new Routes().routes;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/framework")
  .then(async (db) => {
    console.log(`Connected to ${db.connection.name}`);
  })
  .catch((error) => {
    console.log(error.message);
  });
// app.get("/ro", isAuthenticated, (req, res, next) => res.send("cocuou"));
routes.forEach((route: RouteInterface) => {
  const { method, path, action, controller, middlewares } = route;
  app[method](
    path,
    middlewares
      ? middlewares.map(
          (middleware) =>
            async (req: Request, res: Response, next: NextFunction) =>
              middleware(req, res, next)
        )
      : [],
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await controller[action](req, res, next);
      res.status(200).json({ data: result });
    }
  );
});

app.use("*", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "That's a 404 right here..." });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
