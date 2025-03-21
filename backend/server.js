import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
console.log(PORT)

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

const __dirname = path.resolve();
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.post('/api/signup', (req, res) => {
    // check for duplicate username or email

    // create user in db

    // return created user
    res.json({username:'afjdskfj', id:727});
});

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
})