import { Router } from "express"
import { postController } from "../controllers/post.controller"
import { checkAuth } from "../middlewares/checkAuth.middleware"

const postRoutes: Router = Router()

postRoutes.post("/", checkAuth, postController.createPost)
postRoutes.get("/:postId", postController.getPostById)
postRoutes.get("/author/:author", postController.getPostsByAuthor)
postRoutes.get("/author/:author/:postId", postController.getAuthorPost)

export { postRoutes }