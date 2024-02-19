import "dotenv/config";
import { createTransport } from "nodemailer";

interface Iaccount {
    email: string;
    password: string
}

export const transporter = createTransport({
    service: 'gmail',
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.PASS_ACCOUNT
    }
})

export const sendMail = async (account: Iaccount, title: string, html: string) => {
    console.log(account)

    await transporter.sendMail({
        to: account.email,
        subject: title,
        html
    })
}
