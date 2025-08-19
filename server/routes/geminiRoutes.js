require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();
const Task = require("../model/task.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/completion", async (req, res) => {
    const query = req.body.query;

    try {
        // Always fetch fresh tasks from the database
        const tasks = await Task.find({});
        console.log("Fetched Tasks: ", tasks);

        // Generate task data text to include in the system message
        const taskDataText = tasks
            .map(task => `Task: ${task.title}, Status: ${task.status}, Description: ${task.description}`)
            .join("\n");

        // System message with fresh task data
        const systemMessage = {
            role: "system",
            content: `You are a dedicated task management assistant. You should only answer questions related to task management, such as task status, updates, descriptions, or any specific details about the tasks provided. If a question is unrelated to the tasks or task management, politely respond that you can only provide assistance with task-related inquiries. Below is the current list of tasks:\n\n${taskDataText}\n\nUse only this information to answer user questions, and do not provide responses outside of the task context. Also, there is a difference between pending and ongoing tasks: pending means never touched, ongoing means currently being worked on. Don't hallucinate.`
        };

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `${systemMessage.content}\n\nUser: ${query}`;
        const result = await model.generateContent(prompt);

        const assistantResponse = result.response.text();

        // Send the assistant's response back to the client
        res.status(200).json({ response: assistantResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;