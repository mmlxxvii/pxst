import { User } from "../models/user.model"

type Option = "id" | "username"

const findUser = async (user: string, option: Option): Promise<any> => {
    const query: object = option === "id" ? { id: user } : { username: user }
    const getUser = await User.findOne(query)

    return getUser
}

export { findUser }