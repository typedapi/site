import express from "express"
import mainRouter from "./main"

const routes: express.Router[] = [
    mainRouter,
]

export default routes
