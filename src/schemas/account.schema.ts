import { number, z } from "zod";

export const account = z.object({
    id: z.number(),
    name: z.string().min(1, 'O nome é obrigatorio'),
    email: z.string().min(1, 'O e-mail é obrigatorio').email(),
    password: z.string().min(1, 'A senha é obrigatorio'),
    isCollaborator: z.boolean().default(false),
    accountToken: z.string().default(""),
    accountValidated: z.boolean().default(false),
	tokenResetPassword: z.string(),
    created_at: z.date(),
	updated_at: z.date()
})

export const responseAccount = account.omit({password: true})

export const responseAccountUpdate = account.partial()

export const arrayResponseAccount = responseAccount.array()

export const requestAccount = account.omit({id: true, created_at: true, updated_at: true })