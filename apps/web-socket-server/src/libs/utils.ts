import { IncomingMessage } from "node:http";
import { JWT_SECRET } from "@repo/backend-common";
import type { Request } from "express";
import jwt from "jsonwebtoken";
import { WebSocket } from "ws";

export const checkToken = (ws: WebSocket, req: IncomingMessage) => {
  const params = new URLSearchParams(req.url?.split("?")[1]);
  const token = params.get("token");

  const decoded = jwt.verify(String(token), JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
    ws.close();
    return;
  }
  if (!decoded.userId) {
    throw new Error("Invalid token: missing username");
    ws.close();
    return;
  }
};
