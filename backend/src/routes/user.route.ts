import { Router } from "express";

import { createUser, loginUser } from "../controller/user.controller";

const router = Router();

// prettier-ignore
router.route('/')
    .post(loginUser);

router.post("/register", createUser);

export default router;
