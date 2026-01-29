import React, { useEffect, useRef, useState } from "react";

type Shape =
  | {
      type: "rectangle";
      width: number;
      height: number;
      startX: number;
      startY: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
      startAngle: number;
      endAngle: number;
    };

function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const shapesRef = useRef<Shape[]>([]);

  // Keep shapesRef in sync with shapes state
  useEffect(() => {
    shapesRef.current = shapes;
  }, [shapes]);

  useEffect(() => {
    const handleMessage = (data: MessageEvent) => {
      const parsedData = JSON.parse(data.data) as { message: string };
      const newShape = JSON.parse(parsedData.message) as Shape;
      console.log("Received shape:", newShape);
      setShapes((prev) => [...prev, newShape]);
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.moveTo(0, 0);
    context.strokeStyle = "white";
    context.lineTo(200, 100);

    let clicked = false;
    let height = 0;
    let width = 0;
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (clicked) {
        width = e.clientX - startX;
        height = e.clientY - startY;
      }
      clearCanvas(context, canvas, shapesRef.current);
      context.strokeRect(startX, startY, width, height);
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      if (!clicked) return;

      clicked = false;
      const newShape: Shape = {
        type: "rectangle",
        height,
        width,
        startX,
        startY,
      };

      setShapes((prev) => [...prev, newShape]);
      clearCanvas(context, canvas, [...shapesRef.current, newShape]);
      drawRectangle(context, startX, startY, width, height);
      socket.send(
        JSON.stringify({
          type: "chat",
          data: JSON.stringify({
            userId: localStorage.getItem("userId"),
            roomId: roomId,
            message: JSON.stringify(newShape),
          }),
        }),
      );
      console.log("shapes ", [...shapesRef.current, newShape]);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [socket, roomId]);
  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }}>
      <canvas width={Number(window.innerWidth)} height={window.innerHeight} ref={canvasRef}></canvas>
    </div>
  );
}

function clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shapes: Shape[]) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  shapes.map((shapes) => {
    if (shapes.type == "rectangle") {
      drawRectangle(context, shapes.startX, shapes.startY, shapes.width, shapes.height);
    }
  });
}

function drawRectangle(context: CanvasRenderingContext2D, startX: number, startY: number, width: number, height: number) {
  context.strokeRect(startX, startY, width, height);
}
export default Canvas;
