import { prisma } from "../database/prisma";
import { IrequestAccount, IresponseAccount, IresponseAccountUpdate } from "../interfaces/account.interfaces";
import { sendMail } from "../utils/sendEmail";
import { compare, hash } from "bcryptjs";
import { arrayResponseAccount, responseAccount } from "../schemas/account.schema";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import { AppErro } from "../utils/AppErro";
import { geneteTemplateMail } from "../utils/templateMail";

const create = async (dataAccount: IrequestAccount): Promise<IresponseAccount> => {
    const token = uuidv4() 

    dataAccount.password = await hash(dataAccount.password, 10)

    const account = await prisma.account.create({
        data: { ...dataAccount, accountToken: token }
    })

    await sendMail(dataAccount, "Confirmação da conta", geneteTemplateMail(dataAccount.name, "Para confirmar sua conta clique no link abaixo:", "#22BC66", "Confirmar conta", `http://localhost:3000/confirmationAccount?token=${token}` ))

    return responseAccount.parse(account)
}

const read = async () => {
    const accounts = await prisma.account.findMany()

    return arrayResponseAccount.parse(accounts)
}

const login = async (dataLogin: { email: string, password: string }): Promise<string> => {
    const findAccount = await prisma.account.findUnique({
        where: {
            email: dataLogin.email
        }
    })

    if(!findAccount) throw new AppErro("E-mail ou senha incorretos", 400)

    const validatedPassword = await compare(dataLogin.password, findAccount.password)

    if(!validatedPassword) throw new AppErro("E-mail ou senha incorretos", 400)

    const token = sign({id: findAccount.id, isCollaborator: findAccount.isCollaborator}, process.env.SECRET_KEY!, { expiresIn: '5h' })

    return token
}

const confirmationAccount = async (accountToken: string): Promise<void | any> => {
    const findAccount = await prisma.account.findFirst({
        where: {
            accountToken   
        }
    })

    if(!findAccount) throw new AppErro("not found", 404)
    
    await prisma.account.update({
        where: {
            email: findAccount.email
        },
        data: {
            accountToken: "",
            accountValidated: true
        }
    })

    return
}

const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    const findAccount = await prisma.account.findFirst({
        where: {
            tokenResetPassword: token
        }
    })

    if(!findAccount) throw new AppErro("token inválido", 400)
    
    newPassword = await hash(newPassword, 10)
    
    await prisma.account.update({
        where: {
            email: findAccount.email
        },
        data: { password: newPassword, tokenResetPassword: "" }
    })
    
    return
}

const destroy = async (id: string): Promise<void> => {
    const findAccount = await prisma.account.findFirst({
        where: {
            id: Number(id)
        }
    })

    if(!findAccount) throw new AppErro("not found", 404)

    await prisma.account.delete({
        where: {
            email: findAccount.email
        }
    })

    return
}

const update = async (id: string, updateAccount: any): Promise<IresponseAccountUpdate | any> => {
    const findAccount = await prisma.account.findFirst({
        where: {
            id: Number(id)
        }
    })

    if(!findAccount) throw new AppErro("not found", 404)

    const accountUpdated = await prisma.account.update({
        where: {
            email: findAccount?.email
        },
        data: { ...updateAccount }
    })

    return accountUpdated
}

export default { create, read, login, confirmationAccount, sendMail, resetPassword, destroy, update }