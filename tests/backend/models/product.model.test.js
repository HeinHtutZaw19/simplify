import mongoose from 'mongoose';
import Product from '../../../backend/models/product.model.js';
import { describe, expect, test, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Product.deleteMany({});
});

afterEach(async () => {
    await Product.deleteMany({});
});

describe('Product Model Test', () => {
    test('should create & save product successfully', async () => {
        const validProduct = new Product({ name: 'Test Product', price: 100, image: 'test.jpg' });
        const savedProduct = await validProduct.save();
        
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe('Test Product');
        expect(savedProduct.price).toBe(100);
        expect(savedProduct.image).toBe('test.jpg');
    });

    test('should fail to create product without required fields', async () => {
        const productWithoutRequiredField = new Product({ name: 'Test Product' });
        let err;
        try {
            await productWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.price).toBeDefined();
        expect(err.errors.image).toBeDefined();
    });

    test('should update a product', async () => {
        const product = new Product({ name: 'Test Product', price: 100, image: 'test.jpg' });
        await product.save();

        product.name = 'Updated Product';
        const updatedProduct = await product.save();

        expect(updatedProduct.name).toBe('Updated Product');
    });

    test('should delete a product', async () => {
        const product = new Product({ name: 'Test Product', price: 100, image: 'test.jpg' });
        await product.save();

        await Product.deleteOne({ _id: product._id });
        const deletedProduct = await Product.findById(product._id);

        expect(deletedProduct).toBeNull();
    });

    test('should retrieve all products', async () => {
        const product1 = new Product({ name: 'Product 1', price: 100, image: 'test1.jpg' });
        const product2 = new Product({ name: 'Product 2', price: 200, image: 'test2.jpg' });
        await product1.save();
        await product2.save();

        const products = await Product.find({});
        expect(products.length).toBe(2);
        expect(products[0].name).toBe('Product 1');
        expect(products[1].name).toBe('Product 2');
    });
});