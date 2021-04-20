import express from "express"
import http from "http"
import path from "path"
import { getRootDir } from "./utils"
import routes from "./routes"

const rootPath = getRootDir()
const app = express()
app.use("/materialize-css", express.static(path.join(rootPath, "node_modules/materialize-css/dist")))
app.use("/highlight.js", express.static(path.join(rootPath, "node_modules/highlight.js")))
app.use("/", express.static(path.join(rootPath, "public")))
routes.forEach(route => app.use("/", route))

let port = parseInt(process.env.PORT || '8777');
app.set('port', port);
let server = http.createServer(app)
server.listen(port);
console.log(`Server started at http://localhost:${port}`)
