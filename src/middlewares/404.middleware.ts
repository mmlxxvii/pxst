import { Router, Request, Response } from "express"

const notFound: Router = Router()

notFound.all("/*", (req: Request, res: Response) => {
    res.status(404).json({ "error": "page not found" })

})

export { notFound }