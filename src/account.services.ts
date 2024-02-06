import { Request, Response } from "express"
import { prisma } from "./database/prisma"

const create = (dataAccount: any): any => {

    return dataAccount
}

const read = async () => {
    const accounts = await prisma.account.findMany()

    return accounts
}

export default { create, read }