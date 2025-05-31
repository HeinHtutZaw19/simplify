import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AgeGroup = {
    UNDER_18: 'Under 18',
    AGE_18_24: '18 - 24',
    AGE_25_34: '25 - 34',
    AGE_35_44: '35 - 44',
    AGE_45_PLUS: '45 or older',
};
const AgeGroupKeys = Object.keys(AgeGroup);

const WaterIntakeGroup = {
    LOW: 'Less than 1 cup',
    MODERATE: '1-3 cups',
    AVERAGE: '4-6 cups',
    GOOD: '7-9 cups',
    EXCELLENT: '10 or more cups',
};
const WaterIntakeKeys = Object.keys(WaterIntakeGroup);

async function fetchProductsFromSupabase() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new Error(error.message);
    return data;
}

function buildPrompt({ oiliness, sensitivity, ageGroupIndex, waterIntakeIndex }, products) {
    const ageKey = AgeGroupKeys[ageGroupIndex] || null;
    const waterKey = WaterIntakeKeys[waterIntakeIndex] || null;
    const ageGroup = ageKey ? AgeGroup[ageKey] : String(ageGroupIndex);
    const waterIntake = waterKey ? WaterIntakeGroup[waterKey] : String(waterIntakeIndex);

    return `
You are Simpli, a helpful skincare assistant 😊. Based on the user's profile, recommend only from the product list provided.

User Profile:
- Oiliness: ${oiliness}
- Sensitivity: ${sensitivity}
- Age Group: ${ageGroup}
- Water Intake: ${waterIntake}

Only recommend products from the list:
${products.map(p => `• ${p.name} — ${p.description} — Price: ${p.price} — Image: ${p.product_image}`).join("\n")}

Respond with:
- A concise routine grouped as Cleanse → Tone → Moisturize → Protect, with only one product for each process. You MUST recommend exactly one and only one product for each step. Repeating products or skipping steps is not allowed.
- Multiple paragraphs with bullets and fun tone
- A 1-sentence summary under 50 words
- A javascript array of the four chosen products in this exact format: {name, instruction, price, imageUrl}
- Give three skin analysis scores from the image, as a JSON object:
  - Luminosity (0–100)
  - Clarity (0–100)
  - Vibrancy (0–100)
If nothing fits, say: "I'm sorry, I couldn't find a suitable routine. Please reach out to contact@simplify.com 💖."
For the first 3 sections, write it in markdown. Do not wrap the texts in any block.
However, you MUST wrap the valid javascript array inside a code block.
You MUST wrap the valid JSON object inside a json code block.
`;
}
export async function recommendRoutine({
    oiliness,
    sensitivity,
    ageGroupIndex,
    waterIntakeIndex,
    image_url = null,
}) {
    const products = await fetchProductsFromSupabase();
    const prompt = buildPrompt(
        { oiliness, sensitivity, ageGroupIndex, waterIntakeIndex },
        products
    );

    const messages = [
        {
            role: 'user',
            content: image_url
                ? [
                    { type: 'text', text: prompt },
                    { type: 'image_url', image_url: { url: image_url } }
                ]
                : prompt
        }
    ];

    const response = await openai.chat.completions.create({
        model: image_url ? "gpt-4.1-mini" : 'gpt-4',
        messages,
        max_tokens: 1000,
    });

    return response.choices[0].message.content;
}

// (async () => {
//     try {
//         const routine = await recommendRoutine({
//             oiliness: 'Combination',
//             sensitivity: 'Low',
//             ageGroupIndex: 2,
//             waterIntakeIndex: 2,
//             image_url: 'https://cdn.shopify.com/s/files/1/0105/8429/3412/files/4_98aeafba-9579-481f-938d-15329c17632a_480x480.png?v=1617889634',
//         });
//         console.log('Recommended Routine:\n', routine);
//     } catch (err) {
//         console.error('Error:', err);
//     }
// })();
