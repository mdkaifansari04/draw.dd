import { createRoomSchema } from "@repo/common";
import { prisma } from "@repo/db";
import type { Request, Response } from "express";

export const createRoom = (req: Request, res: Response) => {
  try {
    const { success, data } = createRoomSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ success: false, message: "Invalid room data" });
    }
    const { name, slug } = data;
    prisma.room.create({ data: { name, slug, userId: (req as any).userId } });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
