import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET: string = process.env.JWT_TOKEN || ""

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body

    if (!token) {
        return res.status(403).json(null)

    }

    jwt.verify(token, JWT_SECRET, (err: unknown, user: unknown) => {
        if (err) {
            return res.status(403).json(null)
        }

        // @ts-ignore
        req.body.username = user

        next()
    })
}