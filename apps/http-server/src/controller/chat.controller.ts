import { Request, Response } from "express";
import { prisma } from "@repo/db";

export async function getMessages(req: Request, res: Response) {
  try {
    const roomId: string = req.params.roomId as string;
    console.log("rome", roomId);

    const messages = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
    });
    console.log("message", messages);

    res.status(200).json({ data: messages });
  } catch (error) {
    console.log("Internal server error:", error);
  }
}
