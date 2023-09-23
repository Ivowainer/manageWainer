import { Router } from "express";

import { createProject } from "../controller/project.controller";

import checkAuth from "../middleware/checkAuth";

const router = Router();

// prettier-ignore
router.route('/')
    .post(checkAuth, createProject);

export default router;
