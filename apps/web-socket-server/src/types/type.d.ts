interface JoinRoomData {
  username: string;
  userId: string;
  roomId: string;
}

interface ChatData {
  username: string;
  roomId: string;
  userId: string;
  message: string;
}

interface WSMessage {
  type: "join-room" | "chat";
  data: unknown;
}
