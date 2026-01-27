import express, { Router } from "express";
import { createRoom } from "../controller/room.controller";
import { verifyUser } from "../middleware";

const router: Router = express.Router();

router.post("/", verifyUser, createRoom);

export default router;
