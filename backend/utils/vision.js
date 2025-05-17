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

const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{
        role: "user",
        content: [
            { type: "text", text: "What is in this image?" },
            {
                type: "image_url",
                image_url: {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                },
            },
        ],
    }],
});

console.log(response.choices[0].message.content);