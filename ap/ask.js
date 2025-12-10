import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // مدل رایگان
      messages: [
        { role: "system", content: `You are a portfolio assistant for Amir Reza, a graduated MEng Technology Management student in Berlin with degree of 1.9 and a background of Full Stack Engineer specializing in React, TypeScript, Node.js and Python with 5+ years of experience building scalable, production-grade applications. Delivered high-impact features across systems handling 5K+ daily sensor records, 500+ concurrent connections, and multi-tenant platforms. Strong focus on clean architecture, API design, performance improvements, and real-world product delivery.. 
        Answer all questions only about Amir Reza's skills, projects, education, and experience. 
        Be concise, professional, and friendly.
        answer really shortly, briefly and to the point.
        even you don't know the answer make up something you think might be good based on what i have told you.
          Here is some information about Amir Reza:
          - Background: Civil Engineering (BSc), Architecture and 3D modeling (Revit, SketchUp, Rhino, Blender)
          - Current studies: MEng Technology Management, SRH Berlin
          - Skills: React, TypeScript, Three.js, Web Development, Microservices, AI & ML basics, BIM
          - Notable projects:
          - Mini Instagram clone
          - Wiki Browser with iframe
          - Digital Twin for fashion design
          - Real-time Microgrid Monitoring Dashboard
          - Interests: Web development, digital twin, smart buildings, building tech, AI in construction
          - Languages: Persian (native), English, German (studying)` },
        { role: "user", content: question }
      ]
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Server error" });
  }
});

app.listen(3001, ()=> console.log("Server running"))
