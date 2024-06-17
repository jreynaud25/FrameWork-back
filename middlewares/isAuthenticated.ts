import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Client } from '../models/client.model';
dotenv.config();


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Bonjour');
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'No token found' });
    }
    token = token.replace('Bearer ', '');
    //console.log(token);

    //const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || '');
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    console.log('here the token', decodedToken);
    //req.user = decodedToken;
    //const user = await Client.findById(decodedToken._id);

    const user = await Client.findById("6551f8d5571275e2f51e4153");

    req.user = user;
    // Everything is good, let's move to the next route
    next();
    // res.send(user)
  } catch (error) {
    next(error);
  }
};
