import express from "express";
import type { Router } from "express";
import { signin, signup } from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
