import { Router } from "express";

import { createUser, getProfile, loginUser, logout, confirmUser } from "../controller/user.controller";

const router = Router();

// prettier-ignore
router.route('/')
    .get(getProfile)
    .post(loginUser);

router.post("/register", createUser);
router.get("/logout", logout);

router.get("/confirm/:exptoken", confirmUser);

export default router;
