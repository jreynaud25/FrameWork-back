import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  export interface Request {
    user: jwt.CustomJwtPayload;
  }
}

declare module "jsonwebtoken" {
  export interface CustomJwtPayload extends JwtPayload {
    _id: string;
    email: string;
    status: string;
    username: string;
  }
}
