import "dotenv/config";
import { createTransport } from "nodemailer";

interface Iaccount {
    email: string;
    password: string
}

const transport = createTransport({
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
    await transport.sendMail({
        to: account.email,
        subject: title,
        html
    })
}