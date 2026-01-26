const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("connected");
  ws.send("ping");
};

ws.onmessage = (e) => {
  console.log("server:", e.data);
};
