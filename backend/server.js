const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Welcome to the server!");
});

app.post("/doubt", async (req, res) => {
  const { ask } = req.body; 
  if (!ask) {
    return res.status(400).send("Missing 'ask' in the request body.");
  }

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).send("Missing API Key.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction:
      "Act like a perfect study partner chatbot. Explain simply and clarify any doubt and don't give big replies unless asked, reply in proper text and link must be click able",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(ask);
    const responseText = result.response.text();
    console.log("Response:", responseText);
    res.status(200).send({ answer: responseText });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
