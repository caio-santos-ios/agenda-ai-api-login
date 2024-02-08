import { z } from "zod";
import { requestAccount, responseAccount } from "./account.schema";

export type IresponseAccount = z.infer<typeof responseAccount>

export type IrequestAccount = z.infer<typeof requestAccount>