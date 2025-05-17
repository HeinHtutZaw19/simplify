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
    AGE_18_24: '18-24',
    AGE_25_34: '25-34',
    AGE_35_44: '35-44',
    AGE_45_PLUS: '45+',
};
const AgeGroupKeys = Object.keys(AgeGroup);

const WaterIntakeGroup = {
    LOW: '<1 cup',
    MODERATE: '1-3 cups',
    AVERAGE: '4-6 cups',
    GOOD: '7-9 cups',
    EXCELLENT: '10+ cups',
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
${products.map(p => `• ${p.name} — ${p.description}`).join("\n")}

Respond with:
- A concise routine grouped as Cleanse → Exfoliate → Treat → Hydrate → Protect
- Multiple paragraphs with bullets and fun tone
- A 1-sentence summary under 50 words
If nothing fits, say: "I'm sorry, I couldn't find a suitable routine. Please reach out to contact@simplify.com 💖."
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

    const messages = [{ role: 'user', content: prompt }];
    if (image_url) {
        messages.push({ role: 'user', content: JSON.stringify({ type: 'image_url', image_url: { url: image_url } }) });
    }

    const response = await openai.chat.completions.create({
        model: image_url ? "gpt-4.1-mini" : 'gpt-4',
        messages,
        max_tokens: 700,
    });

    return response.choices[0].message.content;
}

(async () => {
    try {
        const routine = await recommendRoutine({
            oiliness: 'Combination',
            sensitivity: 'Low',
            ageGroupIndex: 2,
            waterIntakeIndex: 2,
            image_url: 'https://cdn.shopify.com/s/files/1/0105/8429/3412/files/4_98aeafba-9579-481f-938d-15329c17632a_480x480.png?v=1617889634',
        });
        console.log('Recommended Routine:\n', routine);
    } catch (err) {
        console.error('Error:', err);
    }
})();
