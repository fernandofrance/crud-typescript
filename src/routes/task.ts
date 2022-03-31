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
})

// Create task
router.post("/addtask", (req: Request, res: Response) => {
    const body = req.body;
    fs.readFile("./src/tasks.json", "utf8", (err, buffer) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Could not READ the file" });
        }

        let data = JSON.parse(buffer)
        data.tasks.push(body)

        fs.writeFile("./src/tasks.json", JSON.stringify(data, null, 2), err => {
            if (err) {
                console.error(err)
                return res.status(500).json({ "error": "Could not WRITE the file" })
            }
            res.status(203).json({ "message": "task added" })
        })
    });
    
})

// Update task
router.put("/updatetask", (req: Request, res: Response) => {
    const { name } = req.query;
    const { taskName, taskDescription } = req.body;
    
    fs.readFile("./src/tasks.json", "utf8", (err, buffer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ "error": "Could not READ the file" })
        }
        
        const data = JSON.parse(buffer)
        
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].taskName == name) {
                data.tasks[i].taskName = taskName
                data.tasks[i].taskDescription = taskDescription
                fs.writeFile("./src/tasks.json", JSON.stringify(data, null, 2), err => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ "error": "Could not WRITE the file" })
                    }
                })
                return res.status(200).json({ "message": "Task updated" })
            }
        }
    })
})

router.delete("/deletetask", (req: Request, res: Response) => {
    const { name } = req.query;

    fs.readFile("./src/tasks.json", "utf8", (err, buffer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Could not READ the file" });
        }

        const data = JSON.parse(buffer)
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].taskName == name) {
                data.tasks.splice(i, 1)
                fs.writeFile("./src/tasks.json", JSON.stringify(data, null, 2), err => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ "error": "Could not WRITE the file" })
                    }
                })
                return res.status(200).json({ "message": "Task deleted" })
            }
        }
    })
})

module.exports = router;