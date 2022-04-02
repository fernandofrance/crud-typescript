import { Router } from "express";
import { taskController } from "../controllers/taskController";

const taskRouter = Router();

// Get tasklist
taskRouter.get("/gettasks", taskController.getTasks);

// Create task
taskRouter.post("/addtask", taskController.addTask);

// Update task
taskRouter.put("/updatetask", taskController.updateTask);

// Delete task
taskRouter.delete("/deletetask", taskController.deleteTask);

module.exports = taskRouter;
