import { Router } from "express"

import { postController } from "../controllers/post.controller"
import { checkAuth } from "../middlewares/checkAuth.middleware"
import { checkParams } from "../middlewares/checkParams.middleware"

const postRoutes: Router = Router()

postRoutes.post("/", checkAuth, checkParams(["username", "post"], "body"), postController.createPost)
postRoutes.get("/:postId", checkParams(["postId"], "param"), postController.getPostById)
postRoutes.get("/author/:author", checkParams(["author"], "param"), postController.getPostsByAuthor)
postRoutes.get("/author/:author/:postId", checkParams(["author", "postId"], "param"), postController.getAuthorPost)

export { postRoutes }