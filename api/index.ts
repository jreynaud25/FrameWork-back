import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import indexRoutes from "../routes/index.routes";
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", indexRoutes);
app.use("*", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({ message: "That's a 404 right here..." });
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
