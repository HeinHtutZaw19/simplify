// backend/tests/setupTestDB.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

/**
 * Call this before all tests to spin up an in-memory MongoDB and connect Mongoose to it.
 */
export async function connectTestDB() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Mongoose options to avoid deprecation warnings
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

/**
 * Call this after all tests are finished to drop the in-memory database and disconnect.
 */
export async function closeTestDB() {
    if (mongoServer) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    }
}

/**
 * Call this between tests to clear all collections.
 */
export async function clearTestDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
}
