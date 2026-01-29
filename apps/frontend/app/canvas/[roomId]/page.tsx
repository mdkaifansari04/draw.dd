"use client";
import React, { useEffect, useRef } from "react";

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.moveTo(0, 0);
        context.strokeStyle = "#0000";
        context.lineTo(200, 100);
      }
    }
  }, [canvasRef]);
  return (
    <div className="w-full h-screen">
      <canvas className="w-full h-full" ref={canvasRef}></canvas>
    </div>
  );
}

export default Page;
