import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import { createHmac, randomBytes, randomInt } from "crypto"
import jwt from "jsonwebtoken"

const JWT_SECRET: string = process.env.JWT_TOKEN || ""

const signToken = (password: string): string => {
    return jwt.sign(password, JWT_SECRET)
}

const hashPassword = (password: string): string => {
    return createHmac("sha256", JWT_SECRET).update(password).digest("hex")
}

const generateId = (): number => {
    return randomInt(8)
}

const generateRecoveryKey = (): string => {
    return randomBytes(16).toString()
}

export { signToken, hashPassword, generateId, generateRecoveryKey }