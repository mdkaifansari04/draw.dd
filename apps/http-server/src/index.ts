import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(8000, () => {
  console.log("APP is running on 8000");
});
