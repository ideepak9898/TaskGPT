require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();
const Task = require("../model/task.model");
const { authenticateUser } = require("../middleware/authMiddleware");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Protect this route
router.use(authenticateUser);

router.post("/completion", async (req, res) => {
    const query = req.body.query;

    try {
        // Fetch only this user's tasks
        const tasks = await Task.find({ userId: req.user.id });
        console.log("Fetched Tasks: ", tasks);

        const taskDataText = tasks
            .map(task => `Task: ${task.title}, Status: ${task.status}, Description: ${task.description}`)
            .join("\n");

        const systemMessage = {
            role: "system",
            content: `You are a dedicated task management assistant. Use only the user's tasks provided.\n\n${taskDataText}`
        };

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `${systemMessage.content}\n\nUser: ${query}`;
        const result = await model.generateContent(prompt);

        const assistantResponse = result.response.text();

        res.status(200).json({ response: assistantResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;