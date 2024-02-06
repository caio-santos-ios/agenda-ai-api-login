import express, { Application, json } from "express";
import cors from "cors";

export const app: Application = express()

app.use(json())
app.use(cors())