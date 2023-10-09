import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import { createTask } from "../controller/task.controller";

const router = Router();

// prettier-ignore
router.post("/:projectId", checkAuth, createTask);

export default router;
