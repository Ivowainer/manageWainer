import { Router } from "express";

import { addCollaborator, createProject, getProjects, removeCollaborator, updateProject } from "../controller/project.controller";

import checkAuth from "../middleware/checkAuth";

const router = Router();

// prettier-ignore
router.route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

router.put("/:projectId", checkAuth, updateProject);

// prettier-ignore
router.route('/:projectId/:userCollId')
    .put(checkAuth, addCollaborator)
    .delete(checkAuth, removeCollaborator);

export default router;
