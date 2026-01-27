import express from "express";
import type { Router } from "express";
import authRouter from "./auth.router";

const router: Router = express.Router();

router.use("/auth", authRouter);

export default router;
