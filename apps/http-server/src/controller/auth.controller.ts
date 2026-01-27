import type { Request, Response } from "express";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { createUserSchema, loginUserSchema } from "@repo/common";
import { JWT_EXPIRES_IN, JWT_SECRET } from "@repo/backend-common";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = createUserSchema.parse(req.body);
    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }
    const newUser = await prisma.user.create({ data: { username, password, email } });
    res.status(201).json({ success: true, message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.log("Signup error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginUserSchema.parse(req.body);

    const userFound = await prisma.user.findFirst({ where: { username, password } });
    if (!userFound) return res.status(404).json({ success: false, message: "User not found, please signup" });

    const token = jwt.sign({ userId: userFound.id }, JWT_SECRET, { algorithm: "HS256", expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ success: true, message: "Sign in successfully", token });
  } catch (error) {
    console.log("Signin error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
