import { Router } from "express";
import accountController from "./account.controller";

export const router: Router = Router() 

router.post("/", accountController.create)
router.get("/", accountController.read)