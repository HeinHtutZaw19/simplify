import mongoose from 'mongoose';
import Product from '../../backend/models/product.model.js';
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
        const validProduct = new Product({ name: 'Test Product', price: 100, imageUrl: 'https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg', instruction: 'blah blah' });
        const savedProduct = await validProduct.save();

        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe('Test Product');
        expect(savedProduct.price).toBe(100);
        expect(savedProduct.imageUrl).toBe('https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg');
        expect(savedProduct.instruction).toBe('blah blah')
    });


    test('should update a product', async () => {
        const product = new Product({ name: 'Test Product', price: 100, imageUrl: 'https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg', instruction: 'blah blah' });
        await product.save();
        product.name = 'Updated Product';
        const updatedProduct = await product.save();
        expect(updatedProduct.name).toBe('Updated Product');
    });

    test('should delete a product', async () => {
        const product = new Product({ name: 'Test Product', price: 100, imageUrl: 'https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg', instruction: 'blah blah' });
        await product.save();

        await Product.deleteOne({ _id: product._id });
        const deletedProduct = await Product.findById(product._id);

        expect(deletedProduct).toBeNull();
    });

    test('should retrieve all products', async () => {
        const product1 = new Product({ name: 'Test Product 1', price: 100, imageUrl: 'https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg', instruction: 'blah blah' });
        const product2 = new Product({ name: 'Test Product 2', price: 100, imageUrl: 'https://i5.walmartimages.com/seo/Cetaphil-Daily-Facial-Moisturizer-For-Dry-or-Oily-Combination-Skin-SPF-35-3-fl-oz_0f6109ea-2f0d-46d9-8153-e392d79b7ab9.286a7195f16cc890c1fb0385b25b1773.jpeg', instruction: 'blah blah' });
        await product1.save();
        await product2.save();

        const products = await Product.find({});
        expect(products.length).toBe(2);
        expect(products[0].name).toBe('Test Product 1');
        expect(products[1].name).toBe('Test Product 2');
    });
});