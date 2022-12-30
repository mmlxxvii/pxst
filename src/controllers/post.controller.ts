import { Request, Response } from "express"
import { User } from "../models/user.model"
import { Post } from "../models/post.model"
import { findByUsername } from "../services/findUser.service"

export const postController = {
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
        const user = await User.findOne({ username: author })
        let posts: unknown[] = []

        if (!user || user?.posts.length === 0) {
            return res.json(null)
        }

        for (let i: number = 0, l: number = user.posts.length; i < l; i++) {
            const post = await Post.findOne({ id: user.posts[i] })
            posts.push({
                id: post?.id,
                content: post?.content,
                author: post?.author,
                favNumber: post?.favNumber,
                time: post?.time
            })
        }

        return res.json(posts)
    },

    async getAuthorPost(req: Request, res: Response) {
        const { author, postId } = req.params
        const post = await Post.findOne({ id: postId })

        if (post?.author === author) {
            return res.json({
                id: post?.id,
                content: post?.content,
                author: post?.author,
                favNumber: post?.favNumber,
                time: post?.time
            })
        }

        return res.json(null)
    },

    async createPost(req: Request, res: Response) {
        const { username, post } = req.body

        try {
            const user = await findByUsername(username)
            const _id = await Post.countDocuments()
            const newPost = await Post.create({
                id: _id + 1,
                author: username,
                content: post?.content,
                favNumber: 0,
                time: new Date()
            })

            newPost.save()

            user.posts.push(newPost.id)
            user.save()

            res.json({ "success": "Post created" })

        } catch (err) {
            // @ts-ignore
            console.log(err.message)
            res.json({ "error": "unhandled exception" })

        }
    }
}