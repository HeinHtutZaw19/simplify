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
import { uploadToSupabase, evaluateSelfie } from './utils/vision.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './config/cloudinaryConfig.js';
import { recommendRoutine } from './utils/recommend.js';

// Leaderboard
import leaderboard from './utils/leaderboard.js';
//Streak
import streak from './utils/streak.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
console.log(process.env.CLIENT_URL, process.env.NODE_ENV)
const CLIENT_URL = process.env.NODE_ENV == 'production' ? 'https://simplify-e3px.onrender.com' : 'http://localhost:5173';
console.log(PORT, CLIENT_URL)

const __dirname = path.resolve();
app.set('trust proxy', 1);

app.use(cors({
    origin: CLIENT_URL,
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'simplify',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
const upload = multer({ storage });

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password, routine } = req.body;

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

        const product0 = new Product({
            name: routine[0].name,
            price: routine[0].price,
            imageUrl: routine[0].imageUrl,
            instruction: routine[0].description
        });
        const product1 = new Product({
            name: routine[1].name,
            price: routine[1].price,
            imageUrl: routine[1].imageUrl,
            instruction: routine[1].description
        });
        const product2 = new Product({
            name: routine[2].name,
            price: routine[2].price,
            imageUrl: routine[2].imageUrl,
            instruction: routine[2].description
        });
        const product3 = new Product({
            name: routine[3].name,
            price: routine[3].price,
            imageUrl: routine[3].imageUrl,
            instruction: routine[3].description
        });
        const savedProduct0 = await product0.save();
        const savedProduct1 = await product1.save();
        const savedProduct2 = await product2.save();
        const savedProduct3 = await product3.save();

        const routineIDs = [
            savedProduct0._id,
            savedProduct1._id,
            savedProduct2._id,
            savedProduct3._id
        ]

        // create user in db
        const newUser = new User({
            username: username,
            email: email,
            password: hashed,
            pfp: 'https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg',
            routine: routineIDs,
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

            // return created user
            res.json(newUser);
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
            return res.redirect('http://localhost:5173/login');
        }

        if (!user) {
            console.warn('Google login failed: email not found');
            return res.redirect('http://localhost:5173/login');
        }

        req.session.user = user;

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.redirect('http://localhost:5173/login');
            }
            res.redirect('http://localhost:5173');
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


// Leaderboard
app.use(leaderboard);
// Streak
app.use(streak);

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'Upload failed' });
    }

    res.status(200).json({ imageUrl: req.file.path });
});

app.get('/api/recommendation', async (req, res) => {
    try {
        const {
            oiliness,
            sensitivity,
            ageGroupIndex,
            waterIntakeIndex,
            imageUrl
        } = req.query;

        if (!oiliness || !sensitivity || ageGroupIndex === undefined || waterIntakeIndex === undefined || !imageUrl) {
            res.statusMessage = "Missing required query parameters";
            return res.sendStatus(400);
        }

        const routine = await recommendRoutine({
            oiliness,
            sensitivity,
            ageGroupIndex: parseInt(ageGroupIndex),
            waterIntakeIndex: parseInt(waterIntakeIndex),
            image_url: imageUrl
        });
        res.status(200).json({ routine });
    } catch (error) {
        console.error('Recommendation error:', error.message);
        res.statusMessage = "Recommendation error: " + error.message;
        res.sendStatus(400);
    }
});

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

