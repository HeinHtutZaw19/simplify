import mongoose from 'mongoose';
import Chat from '../../backend/models/chat.model.js';
import { describe, expect, test, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import dotenv from 'dotenv';

dotenv.config(); // Load MONGO_URI from .env

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Chat.deleteMany({});
});

afterEach(async () => {
    await Chat.deleteMany({});
});

describe('Chat Model Test Suite', () => {
    const sampleChat = {
        query: 'What is AI?',
        response: 'AI stands for Artificial Intelligence.'
    };

    test('should create and save a chat successfully', async () => {
        const validChat = new Chat(sampleChat);
        const savedChat = await validChat.save();

        expect(savedChat._id).toBeDefined();
        expect(savedChat.query).toBe(sampleChat.query);
        expect(savedChat.response).toBe(sampleChat.response);
        expect(savedChat.createdAt).toBeInstanceOf(Date);
    });

    test('should fail validation when query is missing', async () => {
        const invalidChat = new Chat({ response: 'Missing query field' });

        let error = null;
        try {
            await invalidChat.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.name).toBe('ValidationError');
        expect(error.errors.query).toBeDefined();
    });

    test('should allow chat with no response (optional field)', async () => {
        const chatNoResponse = new Chat({ query: 'Is this stored?' });
        const savedChat = await chatNoResponse.save();

        expect(savedChat._id).toBeDefined();
        expect(savedChat.response).toBeUndefined();
        expect(savedChat.query).toBe('Is this stored?');
    });

    test('should retrieve all chats', async () => {
        const chat1 = new Chat({ query: 'Q1', response: 'R1' });
        const chat2 = new Chat({ query: 'Q2', response: 'R2' });
        await chat1.save();
        await chat2.save();

        const chats = await Chat.find({});
        expect(chats.length).toBe(2);
        expect(chats[0].query).toBe('Q1');
        expect(chats[1].query).toBe('Q2');
    });
});
