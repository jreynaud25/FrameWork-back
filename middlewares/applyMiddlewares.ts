import { NextFunction, Request, Response } from "express";
import { RouteInterface } from "../interfaces/route.interface";
import { verifyDtoMiddleware } from "./dto.middleware";
import { verifyRefreshMiddleware, verifyTokenMiddleware } from "./tokens.middleware";
import { MiddlewaresEnum } from "../enums/middlewares.enum";

export async function applyMiddlewares(req: Request,res: Response,next: NextFunction, middlewares:any) {

  if (middlewares) next();
  try {
    for (const mdw of middlewares){
      switch (mdw.name) {
        case MiddlewaresEnum.TOKEN:
            await verifyTokenMiddleware(req, res, next)
            break;
        case MiddlewaresEnum.DTO:
            await verifyDtoMiddleware(req, res, next, mdw.classDto)
            break;
        case MiddlewaresEnum.REFRESH_TOKEN:
            await verifyRefreshMiddleware(req, res, next)
            break;
        default:
            console.log("Names your middlewares better")
      } 
    }
    next()
  } catch (error) {
    next(error)
  }
}
