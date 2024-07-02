import router from "../../src/index"
import serverless from "serverless-http"
import express from "express"

export const app = express().use(express.json()).use(router())
export const handler = serverless(app)
