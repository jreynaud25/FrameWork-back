import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'No token found' });
    }
    token = token.replace('Bearer ', '');
    req["user"] = <jwt.CustomJwtPayload>jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
    // res.send(user)
  } catch (error) {
    next(error);
  }
};
