import accountServices from "../../services/account.services"

describe("/accounts", () => {
    test("Criação com sucesso", async () => {

        const account = await accountServices.create({
            name: "caio",
            email: "caio@email.com",
            password: "123",
            accountToken: "",
            accountValidated: false,
            isCollaborator: false,
            tokenResetPassword: ""
        })

        // console.log(account)
    })
})