import { NextFunction, Request, Response } from "express"
import { randomUUID } from "node:crypto"

export function todo_get(req: Request, res: Response, next: NextFunction) {
    res.json([
        {
            id: randomUUID(),
            title: "Task 1",
            description: "This is task one",
            users: randomUUID(),
            status: false
        },
        {
            id: randomUUID(),
            title: "Task 2",
            description: "This is task two",
            users: randomUUID(),
            status: true
        }
    ])
}
