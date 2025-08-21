require('dotenv').config();
const cors = require("cors");
const connectDB = require("./db/db.connect");
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ new for authentication
const { authenticateUser } = require("./middleware/authMiddleware"); 

const app = express()
app.use(express.json())

connectDB()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5050",
      "https://task-gpt-deep.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/', (req, res) => {
    res.send("Hi, Welcome to TaskGPT")
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticateUser, taskRoutes);
// app.use("/api", taskRoutes);
app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
