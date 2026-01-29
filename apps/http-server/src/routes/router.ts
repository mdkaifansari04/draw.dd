import express from "express";
import type { Router } from "express";
import authRouter from "./auth.router";
import roomRouter from "./room.router";
import chatRouter from "./chat.router";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/room", roomRouter);
router.use("/chats", chatRouter);

export default router;
