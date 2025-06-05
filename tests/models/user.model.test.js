import mongoose from 'mongoose';
import User from '../../backend/models/user.model.js';
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
    await User.deleteMany({});
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('User Model Test Suite', () => {
    const sampleUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'securePassword123',
        age: 25,
        region: 'NA',
    };

    // CREATE
    test('should create and save a user successfully', async () => {
        const validUser = new User(sampleUser);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(sampleUser.username);
        expect(savedUser.email).toBe(sampleUser.email);
        expect(savedUser.password).toBe(sampleUser.password);
        expect(savedUser.age).toBe(sampleUser.age);
        expect(savedUser.region).toBe(sampleUser.region);

        // Defaults
        expect(savedUser.pfp).toBeUndefined(); // not provided
        expect(savedUser.forum).toBeUndefined();
        expect(Array.isArray(savedUser.chat)).toBe(true);
        expect(savedUser.chat.length).toBe(0);
        expect(savedUser.feedback).toBeUndefined();
        expect(Array.isArray(savedUser.routine)).toBe(true);
        expect(savedUser.routine.length).toBe(0);
        expect(savedUser.streak).toBe(0);
        expect(Array.isArray(savedUser.days)).toBe(true);
        expect(savedUser.days.length).toBe(0);
        expect(savedUser.routineDate).toBeNull();
        expect(savedUser.point).toBe(0);
        expect(savedUser.createdAt).toBeInstanceOf(Date);
    });

    // READ
    test('should retrieve all users', async () => {
        const user1 = new User({
            username: 'user1',
            email: 'u1@example.com',
            password: 'pass1',
        });
        const user2 = new User({
            username: 'user2',
            email: 'u2@example.com',
            password: 'pass2',
        });

        await user1.save();
        await user2.save();

        const users = await User.find({});
        expect(users.length).toBe(2);
        expect(users[0].username).toBe('user1');
        expect(users[1].username).toBe('user2');
    });

    // UPDATE
    test('should update user fields', async () => {
        const user = new User(sampleUser);
        const saved = await user.save();

        saved.username = 'updatedUser';
        saved.point = 50;
        const updated = await saved.save();

        expect(updated.username).toBe('updatedUser');
        expect(updated.point).toBe(50);
    });

    // MISSING FIELD: missing required fields should cause a validation error
    test('should fail validation when required fields are missing', async () => {
        const missingUsername = new User({
            email: 'no-username@example.com',
            password: 'pwd',
        });

        let error1 = null;
        try {
            await missingUsername.save();
        } catch (err) {
            error1 = err;
        }
        expect(error1).toBeDefined();
        expect(error1.name).toBe('ValidationError');
        expect(error1.errors.username).toBeDefined();

        const missingEmail = new User({
            username: 'noemail',
            password: 'pwd',
        });

        let error2 = null;
        try {
            await missingEmail.save();
        } catch (err) {
            error2 = err;
        }
        expect(error2).toBeDefined();
        expect(error2.name).toBe('ValidationError');
        expect(error2.errors.email).toBeDefined();

        const missingPassword = new User({
            username: 'nopassword',
            email: 'nopassword@example.com',
        });

        let error3 = null;
        try {
            await missingPassword.save();
        } catch (err) {
            error3 = err;
        }
        expect(error3).toBeDefined();
        expect(error3.name).toBe('ValidationError');
        expect(error3.errors.password).toBeDefined();
    });

    // UNIQUE EMAIL: inserting two users with same email should throw a duplicate key error
    test('should fail to save two users with the same email', async () => {
        const userA = new User(sampleUser);
        await userA.save();

        const userB = new User({
            username: 'anotherUser',
            email: sampleUser.email,
            password: 'anotherPassword',
        });

        let error = null;
        try {
            await userB.save();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        // MongoDB duplicate key errors have code 11000
        expect(error.code).toBe(11000);
    });
});
