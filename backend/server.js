import express from 'express';
import dotenv from 'dotenv';
import path from "path";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}