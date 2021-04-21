import express from "express"
import { nunjucks } from "../utils"
import NodeCache from "node-cache"
import { env } from "../env"

const cache = new NodeCache
const router = express.Router()

const getFromCache = (key: string, builder: { (): string }) => {
    if(env === "development") return builder()
    let value: string = cache.get(key)
    if(!value) {
        value = builder()
        cache.set(key, value, 7200)
        console.log(key, "new")
    } else {
        console.log(key, "from cache")
    }
    return value
}

router.get("/", (req, res) => {
    res.send(getFromCache(
        "main", 
        () => nunjucks.render("main.html", {
            mainTab: "main",
            title: "TypedAPI: client-server library for TypeScript projects"
        })
    ))
})

router.get("/getting-started", (req, res) => {
    res.send(getFromCache(
        "getting-started", 
        () => nunjucks.render("getting-started.html", {
            mainTab: "get-started",
            title: "Get started - TypedAPI"
        })
    ))
})

router.get("/docs", (req, res) => {
    res.send(getFromCache(
        "docs", 
        () => nunjucks.render("docs.html", {
            mainTab: "docs",
            title: "Documentation - TypedAPI"
        })
    ))    
})

export default router