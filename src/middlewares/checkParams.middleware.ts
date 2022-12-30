import { Request, Response, NextFunction } from "express"

type search = "param" | "body"

const checkParams = (param: string[], type: search) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let request: any = type === "body" ? req.body : req.params

        for (let i: number = 0, l: number = param.length; i < l; i++) {
            if (!request[param[i]]) {
                return res.json(`${type} ${param[i]} not found`)
            }
        }

        next()
    }
}

export { checkParams }