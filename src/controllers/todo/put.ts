import { NextFunction, Request, Response } from "express"
import { decode } from "jsonwebtoken"
import { sql } from "../../function"

export async function todo_put(req: Request, res: Response, next: NextFunction) {
    try {
        const users = (decode(req.signedCookies.auth) as any).id as string

        if (req.body.id) {
            await sql`
                update todo
                set status = ${req.body.status}
                where id = ${req.body.id}
            `
        } else {
            await sql`insert into todo ${sql({ ...req.body, users })}`
        }

        res.status(200).json({ message: "Success" })
    } catch (error) {
        next(error)
    }
}
