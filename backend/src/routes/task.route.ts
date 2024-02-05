import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/task.controller";

const router = Router();

// prettier-ignore
router.route("/:projectId")
    .get(checkAuth, getTasks)
    .post(checkAuth, createTask);

// prettier-ignore
router.route("/:taskId")
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask);

export default router;
