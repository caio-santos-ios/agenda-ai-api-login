import { prisma } from "./database/prisma";
import { IrequestAccount, IresponseAccount } from "./account.interfaces";
import { sendMail } from "./utils/sendEmail";
import { compare, hash } from "bcryptjs";
import { arrayResponseAccount, responseAccount } from "./account.schema";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";

const create = async (dataAccount: IrequestAccount): Promise<IresponseAccount> => {
    const findAccount = await prisma.account.findUnique({
        where: {
            email: dataAccount.email
        }
    })

    if(findAccount) throw new Error("E-mail inválido")

    dataAccount.password = await hash(dataAccount.password, 10)

    const account = await prisma.account.create({
        data: { ...dataAccount, accountToken: uuidv4() }
    })

    await sendMail(dataAccount, "Confirmação da conta", "<a>Confirmar conta</a>")

    return responseAccount.parse(account)
}

const read = async () => {
    const accounts = await prisma.account.findMany()

    return arrayResponseAccount.parse(accounts)
}

const login = async (dataLogin: { email: string, password: string }) => {
    const findAccount = await prisma.account.findUnique({
        where: {
            email: dataLogin.email
        }
    })

    if(!findAccount) throw new Error("E-mail ou senha incorretos")

    const validatedPassword = await compare(dataLogin.password, findAccount.password)

    if(!validatedPassword) throw new Error("E-mail ou senha incorretos")

    const token = sign({id: findAccount.id, isCollaborator: findAccount.isCollaborator}, process.env.SECRET_KEY!, { expiresIn: '5h' })

    return token
}

const destroy = async () => {

}

const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    const findAccount = await prisma.account.findFirst({
        where: {
            tokenResetPassword: token
        }
    })

    if(!findAccount) throw new Error("token inválido")
    
    newPassword = await hash(newPassword, 10)
    
    await prisma.account.update({
        where: {
            email: findAccount.email
        },
        data: { password: newPassword, tokenResetPassword: "" }
    })
    
    return
}

export default { create, read, login, sendMail, resetPassword }