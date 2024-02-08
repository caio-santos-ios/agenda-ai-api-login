import { NextFunction, Request, Response } from "express";
import { v4 as uuid4 } from "uuid";
import { sendMail } from "../utils/sendEmail";
import Mailgen from 'mailgen';
import { prisma } from "../database/prisma";

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Agenda Ai',
        link: 'https://mailgen.js/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
})

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name } = res.locals.account
    const tokenReset = uuid4()

    const myEmail = {
        body: {
            name,
            action: {
                instructions: 'Para trocar sua senha, click abaixo:',
                button: {
                    color: '#DC4D2F', // Optional action button color
                    text: 'Trocar senha',
                    link: `http://localhost:3001/token=${tokenReset}`
                }
            },
        }
    }

    const emailBody = mailGenerator.generate(myEmail);

    await sendMail(req.body, "Trocar senha", emailBody)

    await prisma.account.update({
        where: {
            email
        },
        data: { tokenResetPassword: tokenReset}
    })

    return next()
}