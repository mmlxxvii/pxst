import { Router } from "express"

import { accountController } from "../controllers/account.controller"
import { checkParams } from "../middlewares/checkParams.middleware"

const accountRoutes: Router = Router()

accountRoutes.post("/login", checkParams(["username", "password"], "body"), accountController.login)
accountRoutes.post("/recovery", checkParams(["username", "recoveryKey"], "body"), accountController.recovery)
accountRoutes.post("/register", checkParams(["username", "password"], "body"), accountController.register)

export { accountRoutes }