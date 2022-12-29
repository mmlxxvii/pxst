import { Request, Response, NextFunction } from "express"
import { findByUsername, findById } from "../services/findUser.service"
import { IUser, User } from "../models/user.model"

export const userController = {
    async get(req: Request, res: Response) {
        const { username } = req.body

        if (!username) {
            return res.json(null)
        }

        const user = await findByUsername(username) satisfies IUser

        if (!user) {
            return res.json(null)
        }

        res.json({
            username: user.username,
            isPremium: user.isPremium,
            favPosts: user.favPosts,
            posts: user.posts,
        })
    },

    async getUserByUsername(req: Request, res: Response) {
        const { username } = req.params

        if (!username) {
            return res.json(null)
        }

        const user = await findByUsername(username) satisfies IUser

        if (!user) {
            return res.json(null)
        }

        res.json({
            username: user.username,
            isPremium: user.isPremium,
            favPosts: user.favPosts,
            posts: user.posts,
        })
    },

    async getUserById(req: Request, res: Response) {
        const { userId } = req.params

        if (!userId) {
            return res.json(null)
        }

        const user = await User.findOne({ id: `${userId}` })

        res.json({
            username: user?.username,
            isPremium: user?.isPremium,
            favPosts: user?.favPosts,
            posts: user?.posts,
        })
    }
}