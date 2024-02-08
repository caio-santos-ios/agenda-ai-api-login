import { Router } from "express";
import accountController from "./account.controller";
import middlewares from "./middlewares";

export const router: Router = Router() 

router.post("/", accountController.create)
router.post("/login", accountController.login)
router.get("/", accountController.read)
router.post("/resetPassword", middlewares.accountValidated, middlewares.resetPassword)
router.patch("/resetPassword/:token", accountController.resetPassword)