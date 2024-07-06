import { NextFunction, Request, Response } from "express"
import { createHmac } from "node:crypto"
import { sql, user } from "../../function"
import { sign } from "jsonwebtoken"

export async function register_post(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body

        if (typeof email !== "string") return res.status(400).json({ code: 400, error: "Invalid email" })
        if (typeof username !== "string") return res.status(400).json({ code: 400, error: "Invalid username" })
        if (typeof password !== "string") return res.status(400).json({ code: 400, error: "Invalid password" })

        const emailExist = (await sql`select * from users where email = ${email}`).shift()
        const usernameExist = (await sql`select * from users where username = ${username}`).shift()

        if (emailExist) return res.status(400).json({ code: 400, error: "Email already exist" })
        if (usernameExist) return res.status(400).json({ code: 400, error: "Username already exist" })

        const hash = createHmac("SHA256", password).update(process.env.SALT).digest("hex")
        const [user] = await sql<Array<Omit<user, "password">>>`insert into users ${sql({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hash
        })} returning id, email, username`

        const jwt = sign(user, process.env.JWT_SECRET, { expiresIn: 604_800_000 })
        res.cookie("auth", jwt, { signed: true, maxAge: 604_800_000 })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}
