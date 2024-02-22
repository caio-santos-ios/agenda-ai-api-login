import accountServices from "../../services/account.services"

describe("/accounts/login", () => {
    test("Testa login com sucesso", async () => {

        const token = await accountServices.login({
            email: "caio@email.com",
            password: "123"
        })

        console.log(process.env.DB)
        // console.log(token)
    })
})