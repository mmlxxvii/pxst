import { Router } from "express"

import { userController } from "../controllers/user.controller"
import { checkParams } from "../middlewares/check-params.middleware"

const userRoutes: Router = Router()

userRoutes.get("/", userController.getAll)
userRoutes.get("/:userId", checkParams(["userId"], "param"), userController.getUserById)
userRoutes.get("/username/:username", checkParams(["username"], "body"), userController.getUserByUsername)

export { userRoutes }