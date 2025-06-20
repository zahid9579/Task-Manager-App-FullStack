import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import taskRoute from './routes/taskRoute.js'
import cors from 'cors'


const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();
app.use(cors())

// Middleware
app.use(express.json())

// Routes
app.use("/api/task/", taskRoute);


app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)

});