import { Router } from "express"
import { userController } from "../controllers/user.controller"

const userRoutes: Router = Router()

/* userRoutes.get("/", userController.get) */
userRoutes.get("/:userId", userController.getUserById)
userRoutes.get("/username/:username", userController.getUserByUsername)

export { userRoutes }