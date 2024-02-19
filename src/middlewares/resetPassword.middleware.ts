import { NextFunction, Request, Response } from "express";
import { v4 as uuid4 } from "uuid";
import { sendMail, transporter } from "../utils/sendEmail";
import { prisma } from "../database/prisma";
import { geneteTemplateMail } from "../utils/templateMail";

const nodemailer = require("nodemailer");

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name } = res.locals.account
    const tokenReset = uuid4()

    await sendMail(req.body, "Trocar senha", geneteTemplateMail(name, "Para alterar sua senha clique abaixo:", "#22BC66", "Alterar senha", `http://localhost:3000/resetPassword?token=${tokenReset}` ))

    await prisma.account.update({
        where: {
            email
        },
        data: { tokenResetPassword: tokenReset}
    })

    return next()
}