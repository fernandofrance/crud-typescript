"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Get tasklist
router.get("/tasklist", (req, res) => {
    const path = "./src/tasks.json";
    fs_1.default.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Could not read the file" });
        }
        try {
            res.status(200).send(data);
        }
        catch (err) {
            console.error(err);
        }
    });
});
// Post task
router.post("/tasklist", (req, res) => {
    const body = req.body;
    fs_1.default.readFile("./src/tasks.json", "utf8", (err, buffer) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Could not READ the file" });
        }
        let data = JSON.parse(buffer);
        data.tasks.push(body);
        fs_1.default.writeFile("./src/tasks.json", JSON.stringify(data), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ "error": "Could not WRITE the file" });
            }
            res.status(203).json({ "message": "task added" });
        });
    });
});
module.exports = router;
