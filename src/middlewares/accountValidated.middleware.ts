import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export const accountValidated = async (req: Request, res: Response, next: NextFunction) => {
    const findAccount = await prisma.account.findUnique({
        where: {
            email: req.body.email
        }
    })

    if(!findAccount) throw new Error("not found")

    if(!findAccount.accountValidated) throw new Error("Conta não foi ativada")

    res.locals.account = findAccount

    return next()
} 