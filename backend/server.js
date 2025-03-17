import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
})