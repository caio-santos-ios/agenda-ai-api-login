import { Router } from "express";
import accountController from "../controllers/account.controller";
import middlewares from "../middlewares";
import { Request, Response } from "express";

export const router: Router = Router() 

router.post("/", middlewares.emailExisty, accountController.create)
router.patch("/confirmation")
router.post("/login", middlewares.accountValidated, accountController.login)
router.get("/", accountController.read)
router.post("/resetPassword", middlewares.validatedToken, middlewares.accountValidated, middlewares.resetPassword, (req: Request, res: Response) => res.status(200).json())
router.patch("/resetPassword/:token", middlewares.validatedToken, accountController.resetPassword)
router.delete("/:id", middlewares.validatedToken, middlewares.verifyOwner, accountController.destroy)
router.patch("/:id", middlewares.validatedToken, middlewares.verifyOwner, middlewares.emailExisty, accountController.update)