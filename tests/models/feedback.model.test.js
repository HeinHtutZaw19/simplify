import mongoose from 'mongoose';
import Feedback from '../../backend/models/feedback.model.js';
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

describe('Feedback model test', () => {
    test('should create a feedback document', async () => {
        const fb = new Feedback({
            feedback: 'Looks great!',
            luminosity: 8,
            clarity: 9,
            vibrancy: 7,
            imageUrl: 'http://example.com/image.jpg',
        });

        const saved = await fb.save();
        expect(saved._id).toBeDefined();
        expect(saved.feedback).toBe('Looks great!');
    });
});
