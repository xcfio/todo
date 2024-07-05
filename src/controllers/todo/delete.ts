import { NextFunction, Request, Response } from "express"
import { sql } from "../../function"

export async function todo_delete(req: Request, res: Response, next: NextFunction) {
    try {
        await sql`delete from todo where id = ${req.body.id}`
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}
