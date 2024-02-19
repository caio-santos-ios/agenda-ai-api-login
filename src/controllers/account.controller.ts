import { Request, Response } from "express";
import accountServices from "../services/account.services";

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

const confirmationAccount = async (req: Request, res: Response): Promise<Response> => {
    await accountServices.confirmationAccount(req.params.token)

    return res.status(200).json({message: "Conta confirmada"})
}

const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    await accountServices.resetPassword(req.params.token, req.body.password)
    
    return res.status(200).json({message: "Senha foi alterada"})
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    await accountServices.destroy(req.params.id)

    return res.status(204).json()
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const accountUpdated = await accountServices.update(req.params.id, req.body)

    return res.status(200).json(accountUpdated)
}

export default { create, read, login, confirmationAccount, resetPassword, destroy, update }