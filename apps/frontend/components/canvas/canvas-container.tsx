/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Canvas from "./canvas";
import { WS_BACKEND_URL } from "@/config";
import { LoaderCircle } from "lucide-react";
import { Shape } from "@/types/type";

function CanvasContainer(props: { roomId: string; existingShape: Shape[] }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useLayoutEffect(() => {
    const ws = new WebSocket(`${WS_BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMzZhNWU5My0xNTQ5LTRhZDYtYWQzYi1hODIwYjdjZTUwZDciLCJpYXQiOjE3Njk2ODI3MjMsImV4cCI6MTc3MDI4NzUyM30.pmPen0CTlFzhCcgBlU5iAphpDK3sOmJAPu9K75eg1eo`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join-room", data: JSON.stringify({ userId: localStorage.getItem("userId"), roomId: props.roomId }) }));
    };
    setSocket(ws);
  }, [props.roomId]);

  if (!socket) return <LoadingScreen />;

  return <Canvas existingShape={props.existingShape} socket={socket} roomId={props.roomId} />;
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full h-screen text-white bg-black">
      <LoaderCircle className="animate-spin w-5 h-5" />
    </div>
  );
}
export default CanvasContainer;
