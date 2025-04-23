require('dotenv').config();
const cors = require("cors");
const connectDB = require("./db/db.connect");
const express = require("express");
const session = require("express-session")
const taskRoutes = require("./routes/taskRoutes");
const openaiRoutes = require("./routes/openaiRoutes")
const app = express()
app.use(express.json())
connectDB()

// app.use(cors({ origin: "*" }));
app.use(cors({
    origin: '*', // for now, allow all
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

// console.log("API KEY:", process.env.OPENAI_API_KEY);

// app.use(session({
//     secret : process.env.SESSION_SECRET,
//     resave : false,
//     saveUninitialized : true,
//     cookie:{secure : false} // i will set it to true while deploying

// }))

app.get('/', (req, res) => {
    res.send("Hello, welcome to todogpt")
})

app.use("/api", taskRoutes);
app.use("/api/openai", openaiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
