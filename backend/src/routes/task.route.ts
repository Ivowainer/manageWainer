import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import { createTask, updateProject } from "../controller/task.controller";

const router = Router();

// prettier-ignore
router.post("/:projectId", checkAuth, createTask);
router.put("/:taskId", checkAuth, updateProject);

export default router;
