import React, { useEffect, useRef, useState } from "react";

type Shape = {
  type: "rectangle" | "circle";
  width: number;
  height: number;
  startX: number;
  startY: number;
};

function Canvas(props: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
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

        canvas.addEventListener("mousedown", (e) => {
          clicked = true;
          startX = e.clientX;
          startY = e.clientY;
        });

        canvas.addEventListener("mousemove", (e) => {
          if (clicked) {
            width = e.clientX - startX;
            height = e.clientY - startY;
          }
          clearCanvas(context, canvas, shapes);
          context.strokeRect(startX, startY, width, height);
        });

        canvas.addEventListener("mouseup", (e) => {
          clicked = false;
          // todo: broadcast through socket
          const newShape: Shape = {
            type: "rectangle",
            height,
            width,
            startX,
            startY,
          };
          shapes.push(newShape);
          clearCanvas(context, canvas, shapes);
          drawRectangle(context, startX, startY, width, height);
          console.log("shapes ", shapes);
        });
      }
    }
  }, [canvasRef]);
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
