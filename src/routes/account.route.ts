import { Router } from "express"
import { accountController } from "../controllers/account.controller"

const accountRoutes: Router = Router()

accountRoutes.post("/login", accountController.login)
accountRoutes.post("/recovery", accountController.recovery)
accountRoutes.post("/register", accountController.register)

export { accountRoutes }