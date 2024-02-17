import Mailgen from 'mailgen';

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

export const geneteTemplateMail = (name: string, instructions: string, color: string, text: string, link: string): any => {

    const email = {
        body: {
            name,
            action: {
                instructions,
                button: {
                    color,
                    text,
                    link
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    const emailBody = mailGenerator.generate(email)

    return emailBody
}
