require('dotenv').config();
const cors = require("cors");
const connectDB = require("./db/db.connect");
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const app = express()
app.use(express.json())
connectDB()

app.use(cors({
    origin: '*', // for now, allow all
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));


// app.use(cors({
//     origin: ['https://task-gpt-deep.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

app.get('/', (req, res) => {
    res.send("Hi, Welcome to TaskGPT")
})

app.use("/api", taskRoutes);
app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
