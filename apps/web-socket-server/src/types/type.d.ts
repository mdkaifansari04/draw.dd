interface JoinRoomData {
  username: string;
  roomId: string;
}

interface ChatData {
  username: string;
  roomId: string;
  message: string;
}

interface WSMessage {
  type: "join-room" | "chat";
  data: unknown;
}
