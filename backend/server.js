import express from 'express';
import session from 'express-session'
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import bcrypt from 'bcryptjs';
import { connectDB } from "./config/db.js";
import User from './models/user.model.js';

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

const sessionSecret = 'VE9zUUDY8FWggzDg'; //random string
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}))

const __dirname = path.resolve();
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.post('/api/signup', async (req, res) => {
    try {
        console.log('--------------------------------------------')
        console.log(req)
        const { username, email, password } = req.body;

        // validate email format
        // <string>@<string>.<string>
        const validEmail = email.toLowerCase().match(/^\S+@\S+\.\S+$/);
        if (!validEmail) {
            console.log('Signup error: Invalid email');
            return;
        }

        // check for duplicate username or email
        const userExists = await User.exists({ username: username });
        if (userExists) {
            console.log('Signup error: Username exists');
            res.sendStatus(409);
            return;
        }
        const emailExists = await User.exists({ email: email });
        if (emailExists) {
            console.log('Signup error: Email exists');
            res.sendStatus(409);
            return;
        }

        // salt + hash the password
        const salted = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salted);

        // create user in db
        const newUser = new User({
            username: username,
            email: email,
            password: hashed,
        })
        await newUser.save();
        console.log('User created:', username);

        // return created user
        res.json(newUser);
    }
    catch (error) {
        console.error('Signup error:', error.message);
        res.sendStatus(400);
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
})