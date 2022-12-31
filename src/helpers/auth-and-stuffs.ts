import "dotenv/config"
import jwt from "jsonwebtoken"
import { randomBytes, createHmac } from "crypto"

const JWT_SECRET: string = process.env.JWT_TOKEN || ""

const signToken = (username: string): string => {
    return jwt.sign(username, JWT_SECRET)
}

const hashPassword = (password: string): string => {
    return createHmac("sha256", JWT_SECRET).update(password).digest("hex")
}

const generateRecoveryKey = (): string => {
    const random: string = randomBytes(5).toString("hex").toUpperCase()
    let mask: string = "xxx-xxxx-xxx"

    for (let i = 0, l = random.length; i < l; i++) {
        mask = mask.replace("x", random[i])
    }

    return mask
}

export { signToken, hashPassword, generateRecoveryKey }