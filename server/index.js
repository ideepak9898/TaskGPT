require('dotenv').config();
const cors = require("cors");
const connectDB = require("./db/db.connect");
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const app = express()
app.use(express.json())
connectDB()

// app.use(cors({
//     origin: ["http://localhost:5050", "https://taskgpt-jqur.onrender.com"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local dev frontend
      "http://localhost:3000",       // if you run CRA locally
      "https://task-gpt-deep.vercel.app" // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/', (req, res) => {
    res.send("Hi, Welcome to TaskGPT")
})

app.use("/api", taskRoutes);
app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
