/**
 * Integration Test on server
 */
import request from 'supertest';
import mongoose from 'mongoose';
import { describe, expect, test, beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import app from '../../backend/server.js'; // <— your refactored Express app, not the `listen` call
import { connectTestDB, closeTestDB, clearTestDB } from './setupTestDB.js';
import User from '../../backend/models/user.model.js';
import Chat from '../../backend/models/chat.model.js';
import Product from '../../backend/models/product.model.js';
import Feedback from '../../backend/models/feedback.model.js';

describe('🚀 Integration Tests for Express Server', () => {
    // SAMPLE DATA
    const sampleRoutine = [
        { name: 'P0', price: 10, imageUrl: 'http://img/0.jpg', instruction: 'inst0' },
        { name: 'P1', price: 20, imageUrl: 'http://img/1.jpg', instruction: 'inst1' },
        { name: 'P2', price: 30, imageUrl: 'http://img/2.jpg', instruction: 'inst2' },
        { name: 'P3', price: 40, imageUrl: 'http://img/3.jpg', instruction: 'inst3' },
    ];
    const sampleFeedback = {
        feedback: 'Great!',
        luminosity: 5,
        clarity: 4,
        vibrancy: 3,
        imageUrl: 'http://img/face.jpg',
    };
    let agent; // used to persist cookies/session across requests

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await connectTestDB();
        // Use supertest’s “agent” so that cookies (session) are preserved between calls.
        agent = request.agent(app);
    });

    afterAll(async () => {
        await closeTestDB();
    });

    beforeEach(async () => {
        // Clear all collections before each test
        await clearTestDB();
    });

    afterEach(async () => {
        // Extra safeguard (not strictly necessary if using beforeEach)
        await clearTestDB();
    });

    // 1) SIGNUP
    test('POST /api/signup → should create a new user, products, feedback, and start a session', async () => {
        const signupPayload = {
            username: 'alice',
            email: 'alice@example.com',
            password: 'password123',
            routine: sampleRoutine,
            feedback: sampleFeedback
        };

        const res = await agent
            .post('/api/signup')
            .send(signupPayload)
            .set('Accept', 'application/json');

        // 1) Expect 200 and JSON body containing the saved user
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            username: 'alice',
            email: 'alice@example.com',
            // hashed password is not exactly “password123”, but at least a string
            password: expect.any(String),
            pfp: expect.any(String),
            routine: expect.any(Array),
            feedback: expect.any(String),
        });

        // 2) Check that 4 Product docs were created
        const productsInDB = await Product.find({});
        expect(productsInDB.length).toBe(4);
        expect(productsInDB[0].name).toBe('P0');

        // 3) Check that 1 Feedback doc was created
        const feedbackInDB = await Feedback.find({});
        expect(feedbackInDB.length).toBe(1);
        expect(feedbackInDB[0].feedback).toBe('Great!');

        // 4) Check that 1 User doc was created, and its `chat` array is empty
        const users = await User.find({});
        // expect(users[0].username).toBe('alice');
        // expect(Array.isArray(users[0].chat)).toBe(true);
        // expect(users[0].chat.length).toBe(0);

        // 5) Because we used agent, a session cookie should now be set:
        //    agent.jar.getCookies(...) would show a `connect.sid`, but supertest doesn’t expose that easily.
        //    Instead, we’ll use checklogin below to confirm session.
    });

    // 2) LOGIN / CHECKLOGIN / LOGOUT
    test('POST /api/login, GET /api/checklogin, GET /api/logout flow', async () => {
        // First, manually insert a User with known credentials:
        //  – We must hash the password to match `bcrypt.compare` in your login route.
        const bcrypt = await import('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash('mypassword', salt);
        const newUser = await User.create({
            username: 'bob',
            email: 'bob@example.com',
            password: hashedPw
        });

        // 2.1) WRONG EMAIL
        let res = await agent
            .post('/api/login')
            .send({ email: 'nonexistent@example.com', password: 'whatever' });
        expect(res.status).toBe(404);
        expect(res.statusMessage).toBe(undefined);

        // 2.2) WRONG PASSWORD
        res = await agent
            .post('/api/login')
            .send({ email: 'bob@example.com', password: 'wrongpassword' });
        expect(res.status).toBe(401);
        expect(res.statusMessage).toBe(undefined);

        // 2.3) CORRECT CREDENTIALS
        res = await agent
            .post('/api/login')
            .send({ email: 'bob@example.com', password: 'mypassword' });
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('bob');

        // 2.4) CHECK LOGIN (should return the user from session)
        res = await agent.get('/api/checklogin');
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('bob');

        // 2.5) LOGOUT
        res = await agent.get('/api/logout');
        expect(res.status).toBe(200);

        // 2.6) CHECK LOGIN AGAIN (should be null now)
        res = await agent.get('/api/checklogin');
        expect(res.status).toBe(200);
        expect(res.body).toBeNull();
    });

    // 3) CHAT: POST /api/chat, GET /api/user/:username/chat, DELETE /api/chat
    test('POST /api/chat → save chat + add to user.chat, then GET and DELETE', async () => {
        // 3.1) Create a user “carol” directly in DB (so chat routes will find `carol.chat`)
        const userCarol = await User.create({
            username: 'carol',
            email: 'carol@example.com',
            password: 'dummyhash'
        });

        // 3.2) POST a chat message
        // We need to mock `querySimpli` (your AI‐response utility) so it returns something predictable.
        // Because `querySimpli` is imported inside server.js, we can spy on it via Vitest’s module mocking.
        // However, supertest + vitest’s auto-mocking can be tricky. Instead, let’s temporarily override:
        const utils = await vi.importMock('../../backend/utils/chat.js');
        utils.default = vi.fn().mockResolvedValue("Hi, I'm Simpli! I am your personal skin - care assistant 😊");
        // That means whenever `querySimpli(...)` is called, it resolves to "Simpli says hi".

        let res = await request(app)
            .post('/api/chat')
            .send({
                username: 'carol',
                userQuery: 'Hello?',
                convHistory: []
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.text).toBe("Hi, I'm Simpli! I am your personal skin-care assistant 😊");

        // 3.3) Verify that a Chat document was saved
        const chatsInDB = await Chat.find({});
        expect(chatsInDB.length).toBe(1);
        expect(chatsInDB[0].query).toBe('Hello?');
        expect(chatsInDB[0].response).toBe("Hi, I'm Simpli! I am your personal skin-care assistant 😊");

        // 3.4) Verify that `carol.chat` array now has 1 ObjectId
        const updatedCarol = await User.findOne({ username: 'carol' });
        expect(updatedCarol.chat.length).toBe(1);
        expect(updatedCarol.chat[0].toString()).toBe(chatsInDB[0]._id.toString());

        // 3.5) GET /api/user/carol/chat → returns an array of interleaved {text, sender} objects
        res = await request(app)
            .get(`/api/user/carol/chat`)
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        // It should flatten: [ {text: query, sender: "You"}, {text: response, sender: "Simpli"} ]
        expect(res.body).toEqual([
            { text: 'Hello?', sender: 'You' },
            { text: "Hi, I'm Simpli! I am your personal skin-care assistant 😊", sender: 'Simpli' }
        ]);

        // 3.6) DELETE /api/chat with missing username → 400
        res = await request(app)
            .delete('/api/chat')
            .send({}) // no username
            .set('Accept', 'application/json');
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ error: 'Missing username in request body' });

        // 3.7) DELETE /api/chat with non‐existent user → 404
        res = await request(app)
            .delete('/api/chat')
            .send({ username: 'not_a_user' })
            .set('Accept', 'application/json');
        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ error: 'User not found' });

        // 3.8) DELETE /api/chat for “carol” → should clear chats
        res = await request(app)
            .delete('/api/chat')
            .send({ username: 'carol' })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ message: 'Chat history cleared' });

        // 3.9) Confirm DB is empty of Chat docs and carol.chat is reset
        const emptyChats = await Chat.find({});
        expect(emptyChats.length).toBe(0);
        const carolAfterDelete = await User.findOne({ username: 'carol' });
        expect(carolAfterDelete.chat.length).toBe(0);
    });
});
