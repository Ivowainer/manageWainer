import type { Request, Response } from "express";
import { Router } from "express";

const router = Router();

// prettier-ignore
router.route("/")
    .post((req, res) => res.json({ msg: "Hi!" }));

export default router;
