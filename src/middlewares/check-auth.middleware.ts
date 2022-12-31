import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET: string = process.env.JWT_TOKEN || ""

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
        return res.status(403).json({ "error": "user not authorized" })
    }

    jwt.verify(token, JWT_SECRET, (err: unknown, user: unknown) => {
        if (err) {
            return res.status(403).json({ "error": "error" })
        }

        req.body.username = user

        next()
    })
}