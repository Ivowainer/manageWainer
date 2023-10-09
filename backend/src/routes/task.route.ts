import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import { createTask, deleteTask, updateTask } from "../controller/task.controller";

const router = Router();

router.post("/:projectId", checkAuth, createTask);

// prettier-ignore
router.route("/:taskId")
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask);

export default router;
