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

Dados de entrada:

```json
    {
        "name": "Caio",
        "email": "caiosantos.dev@outlook.com",
        "password": "12345678"
    }
```

Retorno - 201:
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

### GET - /accounts

Retorno - 200:
Litagem de todas as contas.

```json
    [
        {
             "id": 1,
            "name": "Caio",
            "email": "caiosantos.dev@outlook.com",
            "isCollaborator": false,
            "accountToken": "",
            "accountValidated": true,
            "tokenResetPassword": "",
            "created_at": "2024-02-08T15:35:50.084Z",
            "updated_at": "2024-02-08T15:35:50.084Z"
        },
        {
            "id": 2,
            "name": "jorge",
            "email": "jorge.brabo@gmail.com",
            "isCollaborator": false,
            "accountToken": "",
            "accountValidated": true,
            "tokenResetPassword": "",
            "created_at": "2024-02-17T16:41:01.974Z",
            "updated_at": "2024-02-17T16:41:01.974Z"
        }
    ]
```

### POST - /accounts/resetPassword

<span>Necessário passar token de autenticação</span>

Retorno - 200:
Altera senha da conta.

Dados para alterar:

```json
    {
        "email": "caiosantos.dev@outlook.com"
    }
```

<h5> Será enviado um e-mail, para o usuário logado, com o link + token para alterar senha. </h5>

Retorno - 409:
Tentar alterar senha sem passar o token de autenticação.

```json
    {
        "message": "sem token"
    }
```

### PATCH - /accounts/resetPassword/:token

<span>Necessário passar token de autenticação</span>

Dados de entrata:

```json
    {
        "password": "87654321"
    }
```

Retorno - 200:
Senha foi alterada com sucesso.
```json
    {
        "message": "Senha foi alterada"
    }
```

Retorno - 409:
Tentar alterar senha sem passar o token de autenticação.

```json
    {
        "message": "sem token"
    }
```

### PATCH - /accounts/:id

<span>Necessário passar token de autenticação</span>

Dados de entrada:

```json
    {
        "name": "novo nome"
    }
```

Retorno - 200:
Atualiza a conta - NÂO ATUALIZA A SENHA.

```json
    {
        "id": 1,
        "name": "novo nome",
        "email": "caiosantos.dev@outlook.com",
        "isCollaborator": false,
        "accountToken": "",
        "accountValidated": true,
        "tokenResetPassword": "",
        "created_at": "2024-02-08T15:35:50.084Z",
        "updated_at": "2024-02-08T15:35:50.084Z"
    }
```

Retorno - 409:
Tentar atualizar sem passar token de autenticação.

```json
    {
        "message": "sem token"
    }
```

Retorno - 401:
Tentar atualizar conta de outro usuário.

```json
    {
        "message": "sem autorização"
    }
```

Retorno - 409:
Tentar atualizar email já cadastrado.

```json
    {
        "message": "E-mail inválido"
    }
```

### DELETE - /accounts/:id

<span>Necessário passar token de autenticação</span>

Retorno - 204:
Conta deletada com sucesso.

Retorno - 409:
Tentar deletar conta sem token de autenticação.

```json
    {
        "message": "sem token"
    }
```

Retorno - 401:
Tentar deletar conta de outro usuário.

```json
    {
        "message": "sem autorização"
    }
```
