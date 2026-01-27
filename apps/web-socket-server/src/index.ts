import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer, IncomingMessage } from "node:http";
import { JWT_SECRET } from "@repo/backend-common";

import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { IpcSocketConnectOpts } from "node:net";
import { measureMemory } from "node:vm";
import { checkToken } from "./libs/utils";

const wss = new WebSocketServer({ port: 8080 });

let users: { username: string; roomId: string; ws: WebSocket }[] = [];

const handleJoinRoom = (ws: WebSocket, rawData: unknown) => {
  const data: JoinRoomData = JSON.parse(JSON.stringify(rawData));
  users.push({ username: data.username, roomId: data.roomId, ws });
  console.log("user joined", users);
};

const handleChatInRoom = (ws: WebSocket, rawData: unknown) => {
  const data: ChatData = JSON.parse(JSON.stringify(rawData));
  users.map((user) => {
    if (user.roomId == data.roomId) {
      user.ws && user.ws.send(JSON.stringify({ message: data.message }));
    }
  });
};

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  checkToken(ws, req);

  ws.on("close", () => {
    users = users.filter((user) => user.ws && user.ws != ws);
    console.log("user left", users);
  });

  ws.on("message", (rawData) => {
    const message: WSMessage = JSON.parse(String(rawData));
    console.log("users", users);

    switch (message.type) {
      case "join-room":
        handleJoinRoom(ws, message.data);
        break;
      case "chat":
        handleChatInRoom(ws, message.data);
        break;
      default:
        console.log("error", JSON.stringify(message));
    }
  });
});
