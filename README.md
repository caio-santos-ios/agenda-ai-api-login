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
        "name": "Caio"
    }
```