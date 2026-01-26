import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ host: "localhost", port: 8080 });

wss.on("connection", (ws, req) => {
  console.log("client connected", req.method);

  ws.on("message", (message) => {
    if (String(message) == "ping") ws.send("pong");
    console.log("mes", String(message));

    ws.send("hi");
  });
});
