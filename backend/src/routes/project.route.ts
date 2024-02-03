import { Router } from "express";

import { addCollaborator, createProject, deleteProject, getProject, getProjects, removeCollaborator, updateProject } from "../controller/project.controller";

import checkAuth from "../middleware/checkAuth";

const router = Router();

// prettier-ignore
router.route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

// prettier-ignore
router.route("/:projectId")
    .put(checkAuth, updateProject)
    .get(checkAuth, getProject)
    .delete(checkAuth, deleteProject);

// prettier-ignore
router.route('/:projectId/:userCollId')
    .put(checkAuth, addCollaborator)
    .delete(checkAuth, removeCollaborator);

export default router;
