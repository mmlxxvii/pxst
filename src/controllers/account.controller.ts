import { Request, Response } from "express"

import { User } from "../models/user.model"
import { signToken, hashPassword, generateRecoveryKey } from "../helpers/authAndStuffs"

export const accountController = {
    async login(req: Request, res: Response) {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        const hashedPassword: string = hashPassword(password)

        if (!user || user?.password !== hashedPassword) {
            return res.status(403).json({ "error": "wrong credentials" })
        }

        const token: string = await signToken(username)

        res.json(token)
    },

    async recovery(req: Request, res: Response) {
        const { username, recoveryKey } = req.body
        const user = await User.findOne({ username: username })

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
        const user = await User.findOne({ username: username })

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
            avatarUrl: "https://64.media.tumblr.com/cfa9d7792857d6ae11fdbea13722e947/tumblr_po3avsvOak1v3sej5_540.jpg",
            posts: [],
            favPosts: [],
        })

        newUser.save()

        const token: string = signToken(username)

        res.json(token)
    }
}