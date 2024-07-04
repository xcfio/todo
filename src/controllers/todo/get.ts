import { NextFunction, Request, Response } from "express"
import { randomUUID } from "node:crypto"
import { obj } from "../../function"

export function todo_get(req: Request, res: Response, next: NextFunction) {
    const obj: Array<obj> = [
        {
            id: randomUUID(),
            title: "Note",
            description: `This is just a place holder`,
            users: randomUUID(),
            status: false
        }
    ]

    for (let i = 1; i <= 20; i++) {
        const status = Math.round(Math.random()) === 1
        obj.push({
            id: randomUUID(),
            title: `Task ${i}`,
            description: `This is task ${i} with status ${status}.`,
            users: randomUUID(),
            status
        })
    }
    res.json(obj)
}
