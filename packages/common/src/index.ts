import z from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(100),
  email: z.string().email(),
});

export const loginUserSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(100),
});

export const createRoomSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
});
