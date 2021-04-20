import express from "express"
import { nunjucks } from "../utils"

const router = express.Router()

router.get("/", (req, res) => {
    res.send(nunjucks.render("main.html", {
        mainTab: "main",
        title: "TypedAPI: client-server library for TypeScript projects"
    }))
})

router.get("/getting-started", (req, res) => {
    res.send(nunjucks.render("getting-started.html", {
        mainTab: "get-started",
        title: "Get started - TypedAPI"
    }))
})

router.get("/docs", (req, res) => {
    res.send(nunjucks.render("docs.html", {
        mainTab: "docs",
        title: "Documentation - TypedAPI"
    }))
})

export default router