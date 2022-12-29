import { Schema, model } from "mongoose"

interface IPost {
    id: string,
    author: string,
    content: string,
    favNumber: number,
    time: Date,
}

const postSchema = new Schema<IPost>({
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    favNumber: { type: Number, required: true },
    time: { type: Date, required: true }
})

const Post = model<IPost>("Post", postSchema)

export { IPost, Post }