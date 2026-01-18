import express from "express";
import { readFile, writeFile } from "fs/promises";
import sha1 from "sha1";

const router = express.Router()

const users = readFile("../data/data/users.json")



router.post("/", async (req, res) => {
    const { password, username, gender, age } = req.body
    if (!users[username]) {
        users[username] = {
            password,
            age,
            gender
        }
    }
    const data = await writeFile("../data/users.json")
    res.send({ "data": true })

})


router.get('/', async (req, res) => {
    res.status(200).send(users)
})

export default router