import { Router } from "express";

import { createProject, getProjects, updateProject } from "../controller/project.controller";

import checkAuth from "../middleware/checkAuth";

const router = Router();

// prettier-ignore
router.route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

router.put("/:projectId", checkAuth, updateProject);

export default router;
