import { User } from "../models/user.model"

//TO DO: Re-do it later

export const findByUsername = async (username: string): Promise<any> => {
    const user = await User.findOne({ username: username })

    return user
}

export const findById = async (userId: string): Promise<any> => {
    const user: unknown = await User.findOne({ id: userId })

    return user
}