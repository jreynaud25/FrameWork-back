import * as jwt from 'jsonwebtoken';
declare module 'express-serve-static-core'  {
  export interface Request {
    user: jwt.CustomJwtPayload
  }
}

declare module 'jsonwebtoken' {
  export interface CustomJwtPayload extends jwt.JwtPayload {
    _id: string;
    email: string;
    status: string;
    username: string;
  }
}

