import express from "express";
import fs from "fs";
import { Request, Response } from "express";

const router = express.Router();

// Get tasklist
router.get("/tasklist", (req: Request, res: Response) => {
    const path = "./src/tasks.json"
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Could not read the file" });
        }
        try {
            res.status(200).send(data);
        } catch (err) {
            console.error(err);
        }
    });
});

// Post task
router.post("/tasklist", (req: Request, res: Response) => {
    const body = req.body;
    fs.readFile("./src/tasks.json", "utf8", (err, buffer) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Could not READ the file" });
        }

        let data = JSON.parse(buffer)
        data.tasks.push(body)

        fs.writeFile("./src/tasks.json", JSON.stringify(data), err => {
            if (err) {
                console.error(err)
                return res.status(500).json({ "error": "Could not WRITE the file" })
            }
            res.status(203).json({ "message": "task added" })
        })
    });
    
});

module.exports = router;