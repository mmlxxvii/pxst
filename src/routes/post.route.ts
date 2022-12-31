import { Router } from "express"

import { postController } from "../controllers/post.controller"
import { checkAuth } from "../middlewares/check-auth.middleware"
import { checkParams } from "../middlewares/check-params.middleware"

const postRoutes: Router = Router()

postRoutes.post("/", checkAuth, checkParams(["username", "post"], "body"), postController.createPost)
postRoutes.get("/", postController.getAll)
postRoutes.get("/:postId", checkParams(["postId"], "param"), postController.getPostById)
postRoutes.get("/author/:author", checkParams(["author"], "param"), postController.getPostsByAuthor)
postRoutes.get("/author/:author/:postId", checkParams(["author", "postId"], "param"), postController.getEspecificPostByAuthorAndPostId)

export { postRoutes }