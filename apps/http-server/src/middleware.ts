import { JWT_SECRET } from "@repo/backend-common";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded === null || typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }

    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Internal server error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
