import OpenAI from "openai";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../.env") });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `You are SIMPLI, a skincare assistant. Please describe the image in detail.
Make sure to include the following information:
- Skin type (oily, dry, combination, sensitive)
- Skin tone (light, medium, dark)
- Skin condition (acne, wrinkles, redness, etc.)
- Any product reommendations based on the image.
Give percentage to each following skin condition (luminosity, clarity, vibracy, overall).
- Luminosity (glowing, dull, etc.)
- Clarity (clear, blemished, etc.)
- Vibracy (vibrant, pale, etc.)
- Overall
`;

const evaluate_selfie = async (image, prompt = PROMPT) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{
            role: "user",
            content: [
                { type: "text", text: prompt },
                {
                    type: "image_url",
                    image_url: {
                        url: image,
                    },
                },
            ],
        }],
    });

    return response.choices[0].message.content;
}

const response = await evaluate_selfie("https://cdn.shopify.com/s/files/1/0105/8429/3412/files/4_98aeafba-9579-481f-938d-15329c17632a_480x480.png?v=1617889634")
console.log(response);