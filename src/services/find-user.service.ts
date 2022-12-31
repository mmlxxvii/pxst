import { User } from "../models/user.model"

type option = "id" | "username"

const findUser = async (user: string, option: option): Promise<any> => {
    const query: object = option === "id" ? { id: user } : { username: user }
    const getUser = await User.findOne(query)

    return getUser
}

export { findUser }