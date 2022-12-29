import mongoose, { Schema } from "mongoose"

interface IUser {
    id: string,
    username: string,
    password: string,
    recoveryKey: string,
    avatarUrl: string | null,
    posts: string[],
    favPosts: string[],
    isPremium: boolean
}

const userSchema = new Schema<IUser>({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recoveryKey: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    posts: { type: [String], required: true },
    favPosts: { type: [String], required: true },
    isPremium: { type: Boolean, required: true },
})

const User = mongoose.model<IUser>("User", userSchema)

export { IUser, User }