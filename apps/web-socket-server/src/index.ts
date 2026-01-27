import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer } from "node:http";

import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { IpcSocketConnectOpts } from "node:net";
import { measureMemory } from "node:vm";

const app = express();

// Add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const wss = new WebSocketServer({ server });

interface User {
  username: string;
  id: string;
  token?: string;
  roomId?: string;
  ws?: WebSocket;
}
interface Room {
  name: string;
  token: string;
  roomId: string;
}

let users: User[] = [
  {
    id: "cdf02e36-7022-4dbb-9db3-bc46a5998953",
    username: "kaif",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZGYwMmUzNi03MDIyLTRkYmItOWRiMy1iYzQ2YTU5OTg5NTMiLCJpYXQiOjE3Njk0NTA3OTIsImV4cCI6MTc2OTUzNzE5Mn0.K7ipdix11A86mtj5jQmFq_78kxeZnI5H_cE3cDVVypE",
  },
];
const validTokens: string[] = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZGYwMmUzNi03MDIyLTRkYmItOWRiMy1iYzQ2YTU5OTg5NTMiLCJpYXQiOjE3Njk0NTA3OTIsImV4cCI6MTc2OTUzNzE5Mn0.K7ipdix11A86mtj5jQmFq_78kxeZnI5H_cE3cDVVypE"];
const rooms: Room[] = [];

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/signup", (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    const newUser = { username, id: uuidv4() };
    users.push(newUser);
    res.status(201).json({ success: true, message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.log("Signup error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/signin", (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const userFound = users.find((user) => user.id == userId);
    if (!userFound) return res.status(404).json({ success: false, message: "User not found, please signup" });

    const token = jwt.sign({ userId: userFound.id }, "JWTSECRET", { algorithm: "HS256", expiresIn: "24h" });
    userFound.token = token;
    validTokens.push(token);
    res.status(200).json({ success: true, message: "Sign in successfully", token });
  } catch (error) {
    console.log("Signin error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

interface CustomRequest extends Request {
  token?: string;
}

const checkToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { token } = req.query as { token?: string };

  if (!token) {
    return res.status(401).json({ success: false, message: "Token is required" });
  }

  try {
    jwt.verify(token, "JWTSECRET");
    const tokenFound = validTokens.find((t) => t === token);
    if (!tokenFound) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    req.token = tokenFound;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

app.post("/create-room", checkToken, (req: CustomRequest, res: Response) => {
  const { username, name } = req.body;
  if (!req.token) return res.status(500).json({ message: "token not found" });
  const roomId = uuidv4();
  rooms.push({ roomId, name, token: req.token });
  res.status(201).json({ message: "room created", data: { username, name, token: req.query.token, roomId } });
});

const handleJoinRoom = (ws: WebSocket, rawData: unknown) => {
  interface Data {
    username: string;
    id: string;
    token?: string;
    roomId?: string;
  }
  const data: Data = JSON.parse(JSON.stringify(rawData));

  const userFound = users.find((user) => data.id == user.id);
  if (!userFound) {
    users.push({ ...data, ws });
    return;
  }
  userFound.roomId = data.roomId;
  userFound.ws = ws;
  console.log("joined room: ", data.roomId);
};

const handleChatInRoom = (ws: WebSocket, rawData: unknown) => {
  interface Data {
    username: string;
    roomId: string;
    message: string;
  }
  const data: Data = JSON.parse(JSON.stringify(rawData));
  users.map((user) => {
    if (user.roomId == data.roomId) {
      user.ws && user.ws.send(JSON.stringify({ message: data.message }));
    }
  });
};

interface WSMessage {
  type: "join-room" | "chat";
  data: unknown;
}

wss.on("connection", (ws, req) => {
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
const port = 8080;

server.listen(port, () => {
  console.log("HTTP and websocket is listening on ", port);
});
