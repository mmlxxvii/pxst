import { Request, Response, NextFunction } from "express"
import { findByUsername } from "../services/findUser.service"

import { IUser, User } from "../models/user.model"
import { signToken, hashPassword, generateRecoveryKey } from "../helpers/authAndStuffs"

export const accountController = {
    async login(req: Request, res: Response) {
        const { username, password } = req.body
        const user: IUser = await findByUsername(username)
        const hashedPassword: string = await hashPassword(password)

        if (!user || user?.password !== hashedPassword) {
            return res.status(403).json({ "error": "wrong credentials" })
        }

        const token: string = await signToken(username)

        res.json(token)
    },

    async recovery(req: Request, res: Response) {
        const { username, recoveryKey } = req.body
        const user = await findByUsername(username) satisfies IUser

        if (!user || user?.recoveryKey !== recoveryKey) {
            return res.json({ "error": "credentials does not match" })
        }

        const newRecoveryKey: string = generateRecoveryKey()
        const newPassword: string = generateRecoveryKey()

        user.recoveryKey = newRecoveryKey
        user.password = hashPassword(newPassword)
        user.save()

        res.json({ newRecoveryKey, newPassword })
    },

    async register(req: Request, res: Response) {
        const { username, password } = req.body
        const user: IUser = await findByUsername(username)

        if (user) {
            return res.json({ "error": "username already taken" })
        }

        const _id = await User.countDocuments()
        const newUser = await User.create({
            id: _id + 1,
            username: username,
            password: hashPassword(password),
            recoveryKey: generateRecoveryKey(),
            isPremium: false,
            avatarUrl: "null",
            posts: [],
            favPosts: [],
        })

        newUser.save()
        const token: string = signToken(username)

        res.json(token)
    }
}