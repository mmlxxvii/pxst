import { Router } from "express"

import { userController } from "../controllers/user.controller"
import { checkAuth } from "../middlewares/check-auth.middleware"
import { checkParams } from "../middlewares/check-params.middleware"

const userRoutes: Router = Router()

userRoutes.get("/", userController.getAll)
userRoutes.get("/me", checkAuth, userController.me)
userRoutes.get("/:userId", checkParams(["userId"], "param"), userController.getUserById)
userRoutes.get("/username/:username", checkParams(["username"], "param"), userController.getUserByUsername)

export { userRoutes }