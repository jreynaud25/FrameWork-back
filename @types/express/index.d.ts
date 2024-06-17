import 'express';
import * as jwt from 'jsonwebtoken';
import { Client } from '../models/client.model';
declare module 'express' {
  export interface Request {
    user?: Client;
  }
}

// declare module 'jsonwebtoken' {
//   export interface CustomJwtPayload extends jwt.JwtPayload {
//     userId: number;
//     firstname: string;
//     lastname: string;
//     email: string;
//     firstname: string;
//     lastname: string;
//   }
// }
