import express from "express";
import { askLLM } from "../services/llm.service.js";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 10 requests per hour per IP
  message: { error: 'Too many requests, please try again later' }
});


const router = express.Router();

router.post("/", limiter, async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  const answer = await askLLM(question);
  res.json({ answer });
});

export default router;
