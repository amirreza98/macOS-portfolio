import express from "express";
import { askLLM } from "../services/llm.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  const answer = await askLLM(question);
  res.json({ answer });
});

export default router;
