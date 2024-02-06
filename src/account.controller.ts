import { Request, Response } from "express";
import accountServices from "./account.services";

const create = (req: Request, res: Response): Response => {
    const account = accountServices.create(req.body)

    return res.status(201).json({msg: "Rota post funcionando"})
}

const read = (req: Request, res: Response): Response => {
    const accounts = accountServices.read()

    return res.status(200).json({msg: "Rota get funcionando"})
}

export default { create, read }