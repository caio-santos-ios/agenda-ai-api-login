<html>
    <h1>API de login - DOCUMENTAÇÃO</h1>
## Instalação
Para instalar o projeto, siga estas etapas:

1. Clone o repositório.
2. Execute `npm install`.

## Uso

Para usar o projeto, execute o seguinte comando:

```bash
npm run dev
    <pre>
        <h5>Rota de criação</h5>
            <p>POST - /accounts</p>
            <code>
                {
                    "name": "Caio",
                    "email": "caiosantos.dev@outlook.com",
                    "password": "12345678",
                }
            </code>
            <p>SUCESSO - 200</p>
            <code>
                {
                    "id": 1,
                    "name": "Caio",
                    "email": "caiosantos.dev@outlook.com",
                    "isCollaborator": false,
                    "accountToken": "9ba67632-1153-49d4-965d-2e43fdbb9d33",
                    "accountValidated": false,
                    "tokenResetPassword": "",
                    "created_at": "2024-02-08T15:35:50.084Z",
                    "updated_at": "2024-02-08T15:35:50.084Z"
                }
            </code>
    </pre>
</html>