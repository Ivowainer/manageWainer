import { Router } from "express";

import { createUser, getProfile, loginUser, logout } from "../controller/user.controller";

const router = Router();

// prettier-ignore
router.route('/')
    .get(getProfile)
    .post(loginUser);

router.post("/register", createUser);
router.get("/logout", logout);

export default router;
