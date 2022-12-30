import { Request, Response } from "express"
import { User } from "../models/user.model"
import { Post } from "../models/post.model"

export const postController = {
    async getAll(req: Request, res: Response) {
        const posts = await Post.find({})
        let allPosts: Array<unknown> = []

        for (let i: number = 0, l: number = posts.length; i < l; i++) {
            allPosts.push({
                id: posts[i]?.id,
                author: posts[i]?.author,
                favNumber: posts[i]?.favNumber,
                time: posts[i]?.time
            })
        }

        res.json(allPosts)
    },

    async getPostById(req: Request, res: Response) {
        const { postId } = req.params
        const posts = await Post.findOne({ id: postId })

        if (!posts) {
            return res.json({})
        }

        res.json(posts)
    },

    async getPostsByAuthor(req: Request, res: Response) {
        const { author } = req.params
        const user = await User.findOne({ username: author })
        let posts: unknown[] = []

        if (!user || user?.posts.length === 0) {
            return res.json({})
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

    // idk how to name it :/
    async getEspecificPostByAuthorAndPostId(req: Request, res: Response) {
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

        return res.json({})
    },

    async createPost(req: Request, res: Response) {
        const { username, post } = req.body

        try {
            const user = await User.findOne({ username: username })
            const _id = await Post.countDocuments()
            const newPost = await Post.create({
                id: _id + 1,
                author: username,
                content: post?.content,
                favNumber: 0,
                time: new Date()
            })

            newPost.save()
            user?.posts.push(newPost.id)
            user?.save()

            res.json({ "success": "Post created" })

        } catch (err) {
            res.json({ "error": "unhandled exception" })
        }
    }
}