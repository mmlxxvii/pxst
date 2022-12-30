import { Router } from "express"

import { userController } from "../controllers/user.controller"
import { checkParams } from "../middlewares/checkParams.middleware"

const userRoutes: Router = Router()

userRoutes.get("/:userId", checkParams(["userId"], "param"), userController.getUserById)
userRoutes.get("/username/:username", checkParams(["username"], "body"), userController.getUserByUsername)

export { userRoutes }