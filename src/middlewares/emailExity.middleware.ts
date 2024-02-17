import { Request, Response, NextFunction } from "express"
import { prisma } from "../database/prisma"
import { AppErro } from "../utils/AppErro"

export const emailExisty = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const findAccount = await prisma.account.findUnique({
        where: {
            email
        }
    })

    if(findAccount) throw new AppErro("E-mail inválido", 409)

    return next()
}