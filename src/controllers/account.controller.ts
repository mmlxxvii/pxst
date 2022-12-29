import { Request, Response, NextFunction } from "express"
import { findByUsername } from "../services/findUser.service"

import { User } from "../models/user.model"
import {
    signToken,
    hashPassword,
    generateId,
    generateRecoveryKey
} from "../helpers/verify-auth"

export const accountController = {
    async login(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(403).json(null)
        }

        const user: unknown = await findByUsername(username)
        const hashedPassword: string = await hashPassword(password)

        // @ts-ignore
        if (user?.password !== hashedPassword) {
            return res.status(403).json({ "error": "wrong credentials" })
        }

        const token: string = await signToken(username)

        res.json(token)
    },

    async recovery(req: Request, res: Response) {
        const { username, recoveryKey } = req.body

        if (!username || !recoveryKey) {
            return res.json(null)
        }

        const user: unknown = await findByUsername(username)

        // @ts-ignore
        if (!user || user?.recoveryKey !== recoveryKey) {
            return res.json(null)
        }

        const newRecoveryKey: string = generateRecoveryKey()
        const newPassword: string = generateRecoveryKey()

        // @ts-ignore
        user.recoveryKey = newRecoveryKey
        // @ts-ignore
        user.password = hashPassword(newPassword)
        // @ts-ignore
        user.save()

        res.json({ newRecoveryKey, newPassword })
    },

    async register(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.json(null)
        }

        const user: unknown = await findByUsername(username)

        if (user) {
            return res.json({ "error": "username already taken" })
        }

        (await User.create({
            id: generateId(),
            posts: [],
            favPosts: [],
            username: username,
            password: hashPassword(password),
            recoveryKey: generateRecoveryKey(),
            isPremium: false,
            avatarUrl: "null",
        })).save().catch(err => res.json({ "error": err.message }))

        const token: string = signToken(username)

        res.json(token)
    }
}