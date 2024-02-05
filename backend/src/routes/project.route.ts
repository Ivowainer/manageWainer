import { Router } from "express";

import { addCollaborator, createProject, deleteProject, getCollaborators, getProject, getProjects, removeCollaborator, updateProject } from "../controller/project.controller";

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
router.route('/:projectId/coll')
    .get(checkAuth, getCollaborators)
    .post(checkAuth, addCollaborator)

router.delete("/:projectId/coll/:userCollId", checkAuth, removeCollaborator);

export default router;
