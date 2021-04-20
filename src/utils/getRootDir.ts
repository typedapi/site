import * as path from "path"
import * as fs from "fs"

let rootDir: string | null = null

export const getRootDir = (): string => {
    if (rootDir) return rootDir
    let dir = __dirname
    while (true) {
        dir = path.dirname(dir)
        if (fs.existsSync(dir + "/package.json")) {
            rootDir = dir
            return rootDir
        }
        if (path.dirname(dir) === dir) {
            throw new Error("Project root not found")
        }
    }
}