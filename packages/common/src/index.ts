import z from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createRoomSchema = z.object({
  name: z.string().min(3).max(50),
});
