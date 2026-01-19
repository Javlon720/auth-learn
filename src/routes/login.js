// import express from "express";
// import { readFile, writeFile } from "fs/promises";
// import sha1 from "sha1";

// const router = express.Router()

// const users = JSON.parse(await readFile("../data/users.json"));

// console.log(users);


// // router.post("/", async (req, res) => {
// //     const { password, username, gender, age } = req.body
// //     if (!users[username]) {
// //         users[username] = {
// //             password,
// //             age,
// //             gender
// //         }

// //         await writeFile()
// //     }

// //     res.send({ "data": true })

// // })


// router.get('/', async (req, res) => {
//     res.status(200).send(users)
// })

// export default router





import express from "express";
import { readFile, writeFile } from "fs/promises";
import sha1 from "sha1";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const usersPath = path.join(__dirname, "..", "./data/users.json");

const users = JSON.parse(
    await readFile(usersPath, "utf-8")
);

console.log(0);



router.post("/", async (req, res) => {

    try {

        const { age, gender, username, password } = req.body


        let idname = users[username]


        if (idname) {

            if (idname.password == sha1(password)) {

                return res.send({ "status": `${username} xush kelibsiz` })

            }

            return res.send({ "status": `${username} password xato` })

        }

        else if (!idname && typeof username === "string") {

            if (password && password.length >= 8) {

                users[username] = {

                    age,

                    password: sha1(password),

                    gender

                }

                await writeFile(usersPath, JSON.stringify(users, null, 2))

                return res.send({ "status": username + " ma'lumot kiritildi " })

            } else {
                return res.send({ "status": "password 8 qatordan kam bolmasigi kerak !" })
            }

        }

        else { return res.send({ "status": "usernameda xatolik" }) }


    } catch (error) {

        return res.send(error)
    }

})

router.get("/", (req, res) => {

    res.status(200).json(users);
});

export default router;
