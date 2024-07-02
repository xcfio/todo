import { NextFunction, Request, Response, Router } from "express"
import {} from "jsonwebtoken"
const router = Router()

export default () => {
    router.use((_req, res) => res.status(404).json({ error: "Oh no... look like you entered wrong url" }))
    router.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (!res.headersSent) res.sendStatus(500)
        console.trace(error)
    })
    return router
}
