import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export function auth(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.signedCookies.auth) return res.redirect("/login")
        verify(req.signedCookies.auth, process.env.JWT_SECRET)
        next()
    } catch (error) {
        if (error instanceof Error && error.message === "invalid signature") {
            res.cookie("auth", "invalid signature", { signed: true, maxAge: 0 })
            return res.status(401).redirect("/login")
        } else {
            next(error)
        }
    }
}
