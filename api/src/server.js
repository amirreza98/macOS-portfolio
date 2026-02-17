import express from "express";
import cors from "cors";
import askRoute from "./routes/ask.js";
import 'dotenv/config';


const app = express();

app.use(cors({
  origin: 'https://azemati.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

app.use("/api/ask", askRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

