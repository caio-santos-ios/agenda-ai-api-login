import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppErro } from "../utils/AppErro";

export const verifyOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const myId = Number(id)

    const findAccount = await prisma.account.findFirst({
        where: {
            id: myId
        }
    })

    if(findAccount?.id != res.locals.ownerToken ) throw new AppErro("sem autorização", 401)

    next()
}