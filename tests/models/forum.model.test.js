import mongoose from 'mongoose';
import Forum from '../../backend/models/forum.model.js';
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
    await Forum.deleteMany({});
});

afterEach(async () => {
    await Forum.deleteMany({});
});

describe('Forum Model Test Suite', () => {
    const sampleForum = {
        answers: ['This is an answer', 'This is another answer']
    };

    // CREATE
    test('should create and save a forum successfully', async () => {
        const validForum = new Forum(sampleForum);
        const savedForum = await validForum.save();

        expect(savedForum._id).toBeDefined();
        expect(savedForum.answers.length).toBe(2);
        expect(savedForum.answers[0]).toBe(sampleForum.answers[0]);
        expect(savedForum.createdAt).toBeInstanceOf(Date);
    });

    // READ
    test('should retrieve all forums', async () => {
        const forum1 = new Forum({ answers: ['A1'] });
        const forum2 = new Forum({ answers: ['A2'] });

        await forum1.save();
        await forum2.save();

        const forums = await Forum.find({});
        expect(forums.length).toBe(2);
        expect(forums[0].answers[0]).toBe('A1');
        expect(forums[1].answers[0]).toBe('A2');
    });

    // UPDATE
    test('should update forum answers', async () => {
        const forum = new Forum({ answers: ['Old Answer'] });
        const saved = await forum.save();

        saved.answers.push('New Answer');
        const updated = await saved.save();

        expect(updated.answers.length).toBe(2);
        expect(updated.answers).toContain('New Answer');
    });

    // MISSING FIELD
    test('saving without answers should succeed and produce an empty array', async () => {
        const forumNoAnswers = new Forum({});
        const saved = await forumNoAnswers.save();

        // Because we didn’t mark the array as required, Mongoose gives us [] by default.
        expect(saved._id).toBeDefined();
        expect(Array.isArray(saved.answers)).toBe(true);
        expect(saved.answers.length).toBe(0);
    });

});
