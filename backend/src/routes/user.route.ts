import { Router } from "express";

import { createUser, loginUser, logout } from "../controller/user.controller";

const router = Router();

// prettier-ignore
router.route('/')
    .post(loginUser);

router.post("/register", createUser);
router.get("/logout", logout);

export default router;
