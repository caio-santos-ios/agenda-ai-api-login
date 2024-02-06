import { Request, Response } from "express";
import accountServices from "./account.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const account = await accountServices.create(req.body)

    return res.status(201).json({msg: "Rota post funcionando"})
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const accounts = await accountServices.read()

    return res.status(200).json(accounts)
}

export default { create, read }