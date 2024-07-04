import router from "../../src/index"
import serverless from "serverless-http"
import express from "express"
import { config } from "dotenv"
config()

export const app = express().use(router)
export const handler = serverless(app)

app.listen(7200, () => console.log("Project is running at http://localhost:7200"))
