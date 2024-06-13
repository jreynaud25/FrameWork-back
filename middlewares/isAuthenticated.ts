import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { CustomJwtPayload } from 'jsonwebtoken';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Bonjour');
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'No token found' });
    }
    token = token.replace('Bearer ', '');
    //console.log(token);

    req.user = <CustomJwtPayload>jwt.verify(token, process.env.TOKEN_SECRET || '');
    // const user = await User.findById(payload._id);
    // req.user = user;
    // Everything is good, let's move to the next route
    next();
    // res.send(user)
  } catch (error) {
    next(error);
  }
};
