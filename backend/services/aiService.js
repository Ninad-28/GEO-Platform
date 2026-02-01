/* backend/services/aiService.js */
const Groq = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// We use Llama3-70b because it's smart and fast
const MODEL_NAME = "llama-3.3-70b-versatile";

// 1. GENERATE THE AI ANSWER
const getAiAnswer = async (query) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful search engine assistant." },
        { role: "user", content: query }
      ],
      model: MODEL_NAME,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No answer generated.";
  } catch (error) {
    console.error("❌ Groq Generation Error:", error.message);
    throw new Error("AI Generation failed");
  }
};

// 2. ANALYZE THE GAPS
const analyzeContent = async (query, aiAnswer, websiteContent) => {
  try {
    const prompt = `
      You are a Generative Engine Optimization (GEO) expert.
      
      1. USER QUERY: "${query}"
      2. AI GENERATED ANSWER: "${aiAnswer}"
      3. CLIENT WEBSITE CONTENT: "${websiteContent ? websiteContent.substring(0, 15000) : 'No content'}" 

      TASK: Compare the Client Content against the AI Answer.
      Identify what the Client is MISSING that the AI found important.

      OUTPUT JSON ONLY. Do NOT include markdown formatting (like \`\`\`json). Just the raw JSON string.
      {
        "score": (Integer 0-100),
        "missing_topics": ["topic1", "topic2"],
        "recommendations": ["recommendation1", "recommendation2"]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a strict JSON generator." },
        { role: "user", content: prompt }
      ],
      model: MODEL_NAME,
      temperature: 0.1, // Low temp for consistent JSON
      response_format: { type: "json_object" } // Groq specific feature for perfect JSON
    });

    const text = completion.choices[0]?.message?.content;
    return JSON.parse(text);

  } catch (error) {
    console.error("❌ Groq Analysis Error:", error.message);
    return { score: 0, missing_topics: ["Analysis Failed"], recommendations: [] };
  }
};

module.exports = { getAiAnswer, analyzeContent };