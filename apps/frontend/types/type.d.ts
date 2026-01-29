export type Shape =
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
