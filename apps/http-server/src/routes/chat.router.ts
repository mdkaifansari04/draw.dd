import express, { Router } from "express";
import { getMessages } from "../controller/chat.controller";

const chatRouter: Router = express.Router();

chatRouter.get("/:roomId", getMessages);

export default chatRouter;
