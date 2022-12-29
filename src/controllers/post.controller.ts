import { Request, Response } from "express"
import { IUser, User } from "../models/user.model"
import { IPost, Post } from "../models/post.model"
import { findByUsername } from "../services/findUser.service"
import { generateId } from "../helpers/verify-auth"

export const postController = {
    get(req: Request, res: Response) {
        res.send("GET")
    },

    async getPostById(req: Request, res: Response) {
        const { postId } = req.params
        const posts = await Post.findOne({ id: postId })

        if (!posts) {
            return res.json(null)
        }

        res.json(posts)
    },

    async getPostsByAuthor(req: Request, res: Response) {
        const { author } = req.params

        if (!author) {
            return res.json(null)
        }

        const user = await User.findOne({ username: author })
        let posts: unknown[] = []

        if (!user || user?.posts.length === 0) {
            return res.json(null)
        }

        for (let i: number = 0, l: number = user.posts.length; i < l; i++) {
            const p = await Post.findOne({ id: user.posts[i] })
            posts.push({ id: p?.id, content: p?.content, author: p?.author, favNumber: p?.favNumber, time: p?.time })
        }

        return res.json(posts)
    },

    async getAuthorPost(req: Request, res: Response) {
        const { author, postId } = req.params

        if (!postId || !author) {
            return res.json(null)
        }

        const post = await Post.findOne({ id: postId })

        if (post?.author === author) {
            return res.json({ id: post?.id, content: post?.content, author: post?.author, favNumber: post?.favNumber, time: post?.time })
        }

        return res.json(null)
    },

    async createPost(req: Request, res: Response) {
        const { username, post } = req.body

        try {
            const user = await findByUsername(username) satisfies IUser
            const newPost = await Post.create({
                id: generateId(),
                author: username,
                content: post?.content,
                favNumber: 0,
                time: new Date()
            })

            newPost.save()

            user.posts.push(newPost.id)
            user.save()

            res.json({ "succ": "Post created" })

        } catch (err) {
            res.json({ "error": "uwu" })

        }
    }
}