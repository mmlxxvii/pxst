import mongoose from "mongoose"
import { User, IUser } from "../models/user.model"

export const findByUsername = async (username: string): Promise<any> => {
    const user = await User.findOne({ username: username })

    if (!user) {
        return null
    }

    return user
}

export const findById = async (userId: string): Promise<any> => {
    const user: unknown = await User.findOne({ id: userId })

    if (!user) {
        return null
    }

    return user
}