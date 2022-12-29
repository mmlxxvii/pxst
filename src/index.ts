import "dotenv/config"
import express, { Express } from "express"
import cors from "cors"

import { userRoutes } from "./routes/user.route"
import { postRoutes } from "./routes/post.route"
import { accountRoutes } from "./routes/account.route"

import { notFound } from "./middlewares/404.middleware"

import { connectToDatabase } from "./services/connectToDatabase.service"

const api: Express = express()
const PORT: unknown = process.env.PORT || 1337

api.use(express.json())
api.use(cors())

connectToDatabase()

api.use("/api/users", userRoutes)
api.use("/api/posts", postRoutes)
api.use("/api/account", accountRoutes)
api.use("/*", notFound)


api.listen(PORT, () => console.log(`Running at ::${PORT}`))