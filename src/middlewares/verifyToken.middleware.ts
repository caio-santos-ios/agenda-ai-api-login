import { Request, Response, NextFunction } from "express";
import { AppErro } from "../utils/AppErro";
import { verify } from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers

    if(!authorization) throw new AppErro("sem token", 409)

    const tokenOwner = authorization.slice(7)

    const isValidated: any = verify(tokenOwner, process.env.SECRET_KEY!)
    
    res.locals.ownerToken = isValidated

    return next()
}