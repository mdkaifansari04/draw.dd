import { Request, Response } from "express";
import { prisma } from "@repo/db";

export function getMessages(req: Request, res: Response) {
  try {
    const roomId: string = req.params.roomId as string;

    const messages = prisma.message.findMany({
      where: {
        roomId: roomId,
      },
    });
    if (!messages) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.log("Internal server error:", error);
  }
}
