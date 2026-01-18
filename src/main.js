import express from "express"
import fs from 'node:fs/promises'
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cors from "cors"

dotenv.config()

import loginRouter from "./routes/login.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export default () => {

    const app = express()
    const PORT = process.env.PORT

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"))

    app.use(express.json())
    app.use(cors())

    app.use("/", loginRouter)


    app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
}