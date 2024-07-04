import { login_post, register_post, todo_delete, todo_get, todo_put } from "./controllers"
import { NextFunction, Request, Response, Router, json } from "express"
import { login, register, todo } from "./public"
import { auth } from "./middleware"
import cookie from "cookie-parser"

const router = Router()
router.use(cookie(process.env.cookie_secret))
router.use(json())

router.get("/", (req, res) => (req.cookies.auth ? res.redirect("/todo") : res.redirect("/register")))
router.get("/login", (_, res) => res.send(login))
router.post("/login", login_post)

router.get("/register", (_, res) => res.send(register))
router.post("/register", register_post)

router.get("/todo", auth, (_, res) => res.send(todo))
router.get("/tasks", auth, todo_get)

// router.put("/tasks", auth, todo_put)
// router.delete("/tasks", auth, todo_delete)

router.use((_req, res) => res.status(404).json({ error: "Oh no... look like you entered wrong url" }))
router.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (!res.headersSent) res.status(500).json({ code: 500, error: "Internal Server Error" })
    console.trace(error)
})

export default router
