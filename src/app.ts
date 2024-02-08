import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import { router } from "./account.router";
import handleErrorMiddleware from "./middlewares/handleErro.middleware";

export const app: Application = express()

app.use(json())
app.use(cors())

app.use("/accounts", router)

app.use(handleErrorMiddleware)