import { NextFunction, Request, Response } from "express"
import { createHmac } from "node:crypto"
import { sql, user } from "../../function"
import { sign } from "jsonwebtoken"

export async function login_post(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body

        if (typeof username !== "string") return res.status(401).json({ code: 401, error: "Unauthorized" })
        if (typeof password !== "string") return res.status(401).json({ code: 401, error: "Unauthorized" })

        const hash = createHmac("SHA256", password).update(process.env.SALT).digest("hex")
        const user =
            (
                await sql<Array<user>>`
                    select id, email, username from users
                    where username = ${username.toLowerCase()} and password = ${hash}
                `
            ).shift() ??
            (
                await sql<Array<user>>`
                    select id, email, username from users
                    where email = ${username.toLowerCase()} and password = ${hash}
                `
            ).shift()

        if (!user) return res.status(401).json({ code: 401, error: "Invalid Username or Password" })
        const jwt = sign(user, process.env.JWT_SECRET, { expiresIn: 604_800_000 })
        res.cookie("auth", jwt, { signed: true, maxAge: 604_800_000 })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}
