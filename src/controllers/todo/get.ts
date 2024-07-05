import { NextFunction, Request, Response } from "express"
import { decode } from "jsonwebtoken"
import { sql } from "../../function"

export async function todo_get(req: Request, res: Response, next: NextFunction) {
    try {
        const users = (decode(req.signedCookies.auth) as any).id as string
        const obj = req.params.id
            ? await sql`select * from todo where users = ${users} and id = ${req.params.id}`
            : await sql`select * from todo where users = ${users}`
        res.json(obj)
    } catch (error) {
        next(error)
    }
}
