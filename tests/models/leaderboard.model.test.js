import mongoose from 'mongoose';
import Leaderboard from '../../backend/models/leaderboard.model.js';
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
    await Leaderboard.deleteMany({});
});

afterEach(async () => {
    await Leaderboard.deleteMany({});
});

describe('Leaderboard Model Test Suite', () => {
    // Generate two sample ObjectId values for users
    const userId1 = new mongoose.Types.ObjectId();
    const userId2 = new mongoose.Types.ObjectId();

    const sampleLeaderboard = {
        users: [userId1, userId2],
        isCumulative: true,
        isGlobal: false,
    };

    // CREATE
    test('should create and save a leaderboard successfully', async () => {
        const validLeaderboard = new Leaderboard(sampleLeaderboard);
        const savedLeaderboard = await validLeaderboard.save();

        expect(savedLeaderboard._id).toBeDefined();
        expect(Array.isArray(savedLeaderboard.users)).toBe(true);
        expect(savedLeaderboard.users.length).toBe(2);
        // expect(savedLeaderboard.users[0].toString()).toBe(userId1.toString());
        // expect(savedLeaderboard.users[1].toString()).toBe(userId2.toString());
        expect(savedLeaderboard.isCumulative).toBe(true);
        expect(savedLeaderboard.isGlobal).toBe(false);
        expect(savedLeaderboard.createdAt).toBeInstanceOf(Date);
    });

    // READ
    test('should retrieve all leaderboards', async () => {
        const lb1 = new Leaderboard({ users: [userId1], isCumulative: false, isGlobal: true });
        const lb2 = new Leaderboard({ users: [userId2], isCumulative: true, isGlobal: true });

        await lb1.save();
        await lb2.save();

        const leaderboards = await Leaderboard.find({});
        expect(leaderboards.length).toBe(2);

        // Verify first document’s fields
        expect(leaderboards[0].users.length).toBe(1);
        expect(leaderboards[0].users[0].toString()).toBe(userId1.toString());
        expect(leaderboards[0].isCumulative).toBe(false);
        expect(leaderboards[0].isGlobal).toBe(true);

        // Verify second document’s fields
        expect(leaderboards[1].users.length).toBe(1);
        expect(leaderboards[1].users[0].toString()).toBe(userId2.toString());
        expect(leaderboards[1].isCumulative).toBe(true);
        expect(leaderboards[1].isGlobal).toBe(true);
    });

    // UPDATE
    test('should update leaderboard fields', async () => {
        const lb = new Leaderboard({ users: [userId1], isCumulative: false, isGlobal: false });
        const saved = await lb.save();

        // Modify fields
        saved.users.push(userId2);
        saved.isCumulative = true;
        saved.isGlobal = true;

        const updated = await saved.save();

        expect(updated.users.length).toBe(2);
        expect(updated.users.map(id => id.toString())).toContain(userId2.toString());
        expect(updated.isCumulative).toBe(true);
        expect(updated.isGlobal).toBe(true);
    });

    // MISSING FIELD: since "users" is not marked required, Mongoose will default to []
    test('saving without users should succeed and produce an empty array', async () => {
        const lbNoUsers = new Leaderboard({ isCumulative: false, isGlobal: true });
        const saved = await lbNoUsers.save();

        expect(saved._id).toBeDefined();
        expect(Array.isArray(saved.users)).toBe(true);
        expect(saved.users.length).toBe(0);
        expect(saved.isCumulative).toBe(false);
        expect(saved.isGlobal).toBe(true);
    });
});
