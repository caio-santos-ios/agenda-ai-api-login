import { Request, Response } from "express";
import accountServices from "./account.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const account = await accountServices.create(req.body)

    return res.status(201).json(account)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const accounts = await accountServices.read()

    return res.status(200).json(accounts)
}

const login = async (req: Request, res: Response): Promise<Response> => {
    const token = await accountServices.login(req.body)

    return res.status(200).json({token})
} 

const destroy = async () => {

}

const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    await accountServices.resetPassword(req.params.token, req.body.password)

    return res.status(200).json({message: "Senha foi alterada"})
}

export default { create, read, login, resetPassword }