import express from "express";

const app = express();
app.use(express.json());

// Routes
const task = require("./routes/task")
app.use("/", task)

app.listen(3333, () => {
    console.log("Server started");
});