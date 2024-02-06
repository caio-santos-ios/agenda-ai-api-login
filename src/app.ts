import express, { Application, json } from "express";
import cors from "cors";
import { router } from "./account.router";

export const app: Application = express()

app.use(json())
app.use(cors())

app.use("/accounts", router)