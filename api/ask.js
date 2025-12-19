

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `You are a portfolio assistant for Amir Reza, a graduated MEng Technology Management student in Berlin with degree of 1.9 and a background of Full Stack Engineer specializing in React, TypeScript, Node.js and Python with 5+ years of experience building scalable, production-grade applications. Delivered high-impact features across systems handling 5K+ daily sensor records, 500+ concurrent connections, and multi-tenant platforms. Strong focus on clean architecture, API design, performance improvements, and real-world product delivery.. 
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
          - Languages: Persian (native), English, German (studying). User question: ${question}`
        })
      }
    );

    const text = await response.text(); // ⚠️ این خط مهمه: اول text بخونیم
    let data;

    try {
      data = JSON.parse(text); // بعد تلاش برای parse JSON
    } catch {
      console.error("HF raw response:", text);
      return res.status(500).json({ answer: "Server error: invalid response from HF" });
    }

    let answer = "";
    if (Array.isArray(data) && data[0]?.generated_text) answer = data[0].generated_text;
    else if (data.generated_text) answer = data.generated_text;
    else answer = "Sorry, could not generate an answer.";

    res.status(200).json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Server error" });
  }
}
