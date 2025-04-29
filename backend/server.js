import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import bcrypt from 'bcryptjs';
import { connectDB } from "./config/db.js";
import User from './models/user.model.js';
import Chat from './models/chat.model.js';
import querySimpli from './utils/chat.js';
import { RiSquareFill } from 'react-icons/ri';

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
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.use(session({
    secret: 'VE9zUUDY8FWggzDg', //random string
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60 * 24 * 7, // 7 days, in seconds
        autoRemove: 'native',
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate email format
        // <string>@<string>.<string>
        const validEmail = email.toLowerCase().match(/^\S+@\S+\.\S+$/);
        if (!validEmail) {
            console.log('Signup error: Invalid email');
            res.statusMessage = "Signup error: Invalid email";
            res.sendStatus(401);
            return;
        }

        // check for duplicate username or email
        const usernameExists = await User.exists({ username: username });
        if (usernameExists) {
            console.log('Signup error: Username exists');
            res.statusMessage = "username";
            res.sendStatus(409);
            return;
        }
        const emailExists = await User.exists({ email: email });
        if (emailExists) {
            console.log('Signup error: Email exists');
            res.statusMessage = "email";
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

        // make new session
        req.session.user = newUser;
        req.session.save(err => {
            if (err) {
                console.log('Session(signup) error:', err);
                res.statusMessage = "Session(signup) error: " + err;
                res.sendStatus(400);
                return;
            }
        })

        // return created user
        res.json(newUser);
    }
    catch (error) {
        console.error('Signup error:', error.message);
        res.sendStatus(400);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('hereee')
        // find matching user details in db
        const foundUser = await User.findOne({ email: email });
        console.log('hereee2')
        if (!foundUser) {
            console.log('Login error: email not found');
            res.statusMessage = "email";
            res.sendStatus(404);
            return;
        }

        // match hashed pw with the db
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            res.statusMessage = "password";
            res.sendStatus(401);
            return;
        }

        // make new session
        req.session.user = foundUser;
        req.session.save(err => {
            if (err) {
                console.log('Session(login) error:', err)
                res.statusMessage = "Session(login) error: " + err;
                res.sendStatus(400);
                return;
            }
        })

        // return created user
        res.json(foundUser);
    }
    catch (error) {
        console.error('Login error:', error.message);
        res.statusMessage = "Login error: " + error.message;
        res.sendStatus(400);
    }
});

app.get('/api/checklogin', (req, res) => {
    let user = null;
    if (req.session.user) {
        user = req.session.user;
    }
    res.json(user);
});

app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Session(logout) error:', err)
            res.statusMessage = "Session(logout) error:" + err;
            res.sendStatus(400);
            return;
        }
    })
    res.sendStatus(200);
});

app.post('/api/chat', async (req, res) => {
    try {
        const { username, userQuery } = req.body;
        const simpliResponse = await querySimpli(userQuery)
        const newChatObj = new Chat({
            query: userQuery,
            response: simpliResponse
        });
        const savedChat = await newChatObj.save();
        await User.findOneAndUpdate(
            { username: username },
            { $push: { chat: savedChat._id } }
        );
        console.log('user:', username, 'saved chat with id:', savedChat._id);
        res.status(200).send(simpliResponse);
    } catch {
        res.sendStatus(500);
    }
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
})