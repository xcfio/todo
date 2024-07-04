import { NextFunction, Request, Response } from "express"
import { createHmac } from "crypto"

export function register_post(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    res.sendStatus(200)
}
