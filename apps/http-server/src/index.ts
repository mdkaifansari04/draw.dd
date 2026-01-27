import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";
import { v4 as uuidv4 } from "uuid";
import router from "./routes/router";
const app = express();inde

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(8000, () => {
  console.log("APP is running on 8000");
});
