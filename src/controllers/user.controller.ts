import { Request, Response } from "express"
import { User } from "../models/user.model"

export const userController = {
    async getUserByUsername(req: Request, res: Response) {
        const { username } = req.params
        const query: object = { username: username }

        try {
            const user = await User.findOne(query)

            if (!user) {
                return res.json(user)
            }

            res.json({
                username: user.username,
                isPremium: user.isPremium,
                favPosts: user.favPosts,
                posts: user.posts,
            })

        } catch (err) {
            res.json({ "error": "unhandled exception" })
        }
    },

    async getUserById(req: Request, res: Response) {
        const { userId } = req.params
        const query: object = { id: userId }

        try {
            const user = await User.findOne(query)

            if (!user) {
                return res.json(user)
            }

            res.json({
                id: user?.id,
                username: user?.username,
                isPremium: user?.isPremium,
                favPosts: user?.favPosts,
                posts: user?.posts,
            })

        } catch (err) {
            res.json({ "error": "unhandled exception" })
        }
    },

    async getAll(req: Request, res: Response) {
        const users = await User.find({})
        let allUsers: Array<unknown> = []

        for (let i: number = 0, l: number = users.length; i < l; i++) {
            allUsers.push({
                id: users[i]?.id,
                username: users[i]?.username,
                avatarUrl: users[i]?.avatarUrl,
                isPremium: users[i]?.isPremium,
                favPosts: users[i]?.favPosts,
                posts: users[i]?.posts
            })
        }

        res.json(allUsers)
    },

    async me(req: Request, res: Response) {
        const { username } = req.body
        const user = await User.findOne({ username: username })

        if (!user) {
            return res.json({})
        }

        res.json({
            id: user?.id,
            username: user?.username,
            isPremium: user?.isPremium,
            favPosts: user?.favPosts,
            posts: user?.posts,
        })
    }
}