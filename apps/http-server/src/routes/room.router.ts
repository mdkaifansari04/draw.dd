import express, { Router } from "express";
import { createRoom, getRoomBySlug } from "../controller/room.controller";
import { verifyUser } from "../middleware";

const router: Router = express.Router();

router.post("/", verifyUser, createRoom);
router.get("/:slug", verifyUser, getRoomBySlug);

export default router;
