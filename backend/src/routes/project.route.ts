import { Router } from "express";

import { createProject, getProjects } from "../controller/project.controller";

import checkAuth from "../middleware/checkAuth";

const router = Router();

// prettier-ignore
router.route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

export default router;
