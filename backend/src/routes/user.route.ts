import { Router } from "express";

import { createUser } from "../controller/user.controller";

const router = Router();

// prettier-ignore
router.route("/")
    .post(createUser);

export default router;
