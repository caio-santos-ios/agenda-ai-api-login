import { z } from "zod";
import { requestAccount, responseAccount, responseAccountUpdate } from "../schemas/account.schema";

export type IresponseAccount = z.infer<typeof responseAccount>

export type IrequestAccount = z.infer<typeof requestAccount>

export type IresponseAccountUpdate = z.infer<typeof responseAccountUpdate>