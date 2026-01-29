import { createRoomSchema } from "@repo/common";
import { prisma } from "@repo/db";
import type { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { success, data } = createRoomSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ success: false, message: "Invalid room data" });
    }
    const { name } = data;

    console.log("name", name);
    console.log("user", (req as any).userId);

    const room = await prisma.room.create({ data: { name, slug: name.split(" ").join("-").toLowerCase(), userId: (req as any).userId } });
    res.status(201).json({ success: true, message: "Room created successfully", data: room });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getRoomBySlug = async (req: Request, res: Response) => {
  try {
    const slug: string = req.params.slug as string;
    const room = await prisma.room.findFirst({ where: { slug } });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
