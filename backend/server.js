import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import bcrypt from 'bcryptjs';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.js";
import './config/passport.js';
import User from './models/user.model.js';
import Chat from './models/chat.model.js';
import Product from './models/product.model.js';
import querySimpli from './utils/chat.js';
import { RiSquareFill } from 'react-icons/ri';
import formatConvHistory from './utils/formatConvHistory.js';
import { evaluateSelfie } from './utils/vision.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
var FRONTEND_PORT = 5173;
const isProd = process.env.NODE_ENV === 'production';

console.log(isProd)

app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());


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
        secure: false,
        sameSite: 'none',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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

        // mock data for initial products (change to actual recommended products from survey later)
        const mockProduct1 = new Product({
            name: 'product 1',
            price: 10,
            imageUrl: 'https://pngimg.com/d/number1_PNG14888.png',
            instruction: 'instruction 1'
        })
        const savedProduct1 = await mockProduct1.save();
        const mockProduct2 = new Product({
            name: 'product 2',
            price: 10,
            imageUrl: 'https://i.pinimg.com/736x/85/f5/be/85f5bedff0758abea714994d3c398559.jpg',
            instruction: 'instruction 2'
        })
        const savedProduct2 = await mockProduct2.save();
        const mockProduct3 = new Product({
            name: 'product 3',
            price: 10,
            imageUrl: 'https://i.pinimg.com/600x315/c0/a0/07/c0a0077f1c0cae02626f8f8281f0df35.jpg',
            instruction: 'instruction 3'
        })
        const savedProduct3 = await mockProduct3.save();
        const mockProduct4 = new Product({
            name: 'product 4',
            price: 10,
            imageUrl: 'https://t3.ftcdn.net/jpg/01/37/43/16/360_F_137431664_H1WqRW3AmzOpZsYqboJ9fGUZ1P6YnS2u.jpg',
            instruction: 'instruction 4'
        })
        const savedProduct4 = await mockProduct4.save();

        const mockRoutine = [
            savedProduct1._id,
            savedProduct2._id,
            savedProduct3._id,
            savedProduct4._id
        ]

        // create user in db
        const newUser = new User({
            username: username,
            email: email,
            password: hashed,
            pfp: 'https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg',
            routine: mockRoutine,
        })
        const savedUser = await newUser.save();
        console.log('User created:', savedUser);

        // make new session
        req.session.user = savedUser;
        req.session.save(err => {
            if (err) {
                console.log('Session(signup) error:', err);
                res.statusMessage = "Session(signup) error: " + err;
                res.sendStatus(400);
                return;
            }
            // return created user
            res.json(savedUser);
        })
    }
    catch (error) {
        console.error('Signup error:', error.message);
        res.sendStatus(400);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // find matching user details in db
        const foundUser = await User.findOne({ email: email });
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
            // return created user
            res.json(foundUser);
        })
    }
    catch (error) {
        console.error('Login error:', error.message);
        res.statusMessage = "Login error: " + error.message;
        res.sendStatus(400);
    }
});

app.get('/api/login/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

app.get('/api/login/google/callback', (req, res, next) => {
    passport.authenticate('google', async (err, user, info) => {
        if (err) {
            console.error('Google login error:', err);
            return res.redirect(`http://localhost:${FRONTEND_PORT}/login`);
        }

        if (!user) {
            console.warn('Google login failed: email not found');
            return res.redirect(`http://localhost:${FRONTEND_PORT}/login`);
        }

        req.session.user = user;

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.redirect(`http://localhost:${FRONTEND_PORT}/login`);
            }
            res.redirect(`http://localhost:${FRONTEND_PORT}`);
        });

    })(req, res, next);
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

app.get(`/api/user/:username/chat`, async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        const foundChats = await Chat.find({ _id: { $in: user.chat } }).sort({ createdAt: 1 });
        const chats = foundChats.flatMap((chat) => [
            { text: chat.query, sender: "You" },
            { text: chat.response, sender: "Simpli" }
        ]);
        res.status(200).send(chats);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

app.post('/api/chat', async (req, res) => {
    try {
        const { username, userQuery, convHistory } = req.body;
        const simpliResponse = await querySimpli(userQuery, convHistory);
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

app.delete('/api/chat', async (req, res) => {
    try {
        console.log("DELETE /api/chat");
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Missing username in request body' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Chat.deleteMany({ _id: { $in: user.chat } });

        // 3) Clear the user's chat array
        user.chat = [];
        await user.save();

        console.log(`Deleted all chats for user: ${username}`);
        return res.status(200).json({ message: 'Chat history cleared' });
    } catch (err) {
        console.error('Error in DELETE /api/chat:', err);
        return res.sendStatus(500);
    }
});

app.get(`/api/user/:username/routine`, async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        const foundProducts = await Product.find({ _id: { $in: user.routine } }).sort({ createdAt: 1 });
        res.status(200).send(foundProducts);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

app.post("/api/selfie", async (req, res) => {
    try {
        const publicUrl = req.body.image;
        if (!publicUrl) {
            return res.status(400).json({ message: "No image provided" });
        }
        const analysis = await evaluateSelfie(publicUrl);
        return res.status(200).json({ message: analysis });
    } catch (err) {
        console.error("Error in /api/selfie:", err);
        return res.status(500).json({ message: "Error processing image" });
    }
});

const __dirname = path.resolve();
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
})