import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const rawData = fs.readFileSync('../../resources/filtered_items.json', 'utf8');
const products = JSON.parse(rawData);

// const categoryList = ["skincare", "men&#39;s"];

// const filteredItems = products
//     .filter(item => categoryList.includes(item.category?.toLowerCase()))
//     .map(item => ({
//         ...item,
//         description: item.description.join(' ').replace(/\s+/g, ' ').trim(),
//         product_image: item.product_image[0] || null, // Use first image
//     }));

// fs.writeFileSync('../../resources/filtered_items.json', JSON.stringify(filteredItems, null, 2));


async function uploadProducts() {
    const { data, error } = await supabase
        .from('products')
        .insert(products);

    if (error) {
        console.error('Upload failed:', error);
    } else {
        console.log('Upload successful:', data);
    }
}

uploadProducts();
