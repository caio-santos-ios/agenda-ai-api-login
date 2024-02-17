# API de login - DOCUMENTAÇÃO

## Instalação

Para instalar o projeto, siga estas etapas:

1. Clone o repositório.
2. Execute `npm install`.

## Uso

Para usar o projeto, execute o seguinte comando:

```bash
npm run dev
```

## Rotas

| Método | Rota                             | Descrição                            |
| ------ | ------------------------         | ------------------------------------ |
| POST   | /accounts/login                  | Rota para login                      |
| PATCH  | /accounts/confirmation           | Rota para confirmar a conta criada   |
| POST   | /accounts                        | Rota para registro                   |
| GET    | /accounts                        | Rota para obter todos usuários       |
| POST   | /accounts/resetPassword          | Rota para solicitar alterar senha    |
| PATCH  | /accounts/resetPassword/:token   | Rota para alterar senha              |
| DELETE | /accounts/:id                    | Rota para excluir usuário por ID     |

### POST - /accounts

Dados para criação:

```json
    {
        "name": "Caio",
        "email": "caiosantos.dev@outlook.com",
        "password": "12345678"
    }
```

Retorno - 200:
Conta criada com sucesso.

```json
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
```

Retorno - 409:
Quando o e-mail já esta cadastrado.

```json
    {
        "message": "E-mail inválido"
    }
```

### POST - /accounts/login

Dados para login:

```json
    {
        "email": "caiosantos.dev@outlook.com",
        "password": "12345678"
    }
```

Retorno - 200:
Login feito com sucesso.

```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaXNDb2xsYWJvcmF0b3IiOmZhbHNlLCJpYXQiOjE3MDc0MDk0NjIsImV4cCI6MTcwNzQyNzQ2Mn0.jxYvQTFmA9QliVFoVzPfsCmuCvoBs2ZsdUO9RhD0bfc"
    }
```

Retorno - 409:
Tentar fazer o login sem ativar conta.

```json
    {
         "message": "Conta não foi ativada"
    }
```

Retorno - 400:
E-mail ou senha incorretos.

```json
    {
        "message": "E-mail ou senha incorretos"
    }
```
