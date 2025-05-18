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

Use different heading for each section, bold words and italic words if necessary. Use one or two emoji for each section. After each section or subsection, make a line break.
If the image is not clear, please say "The image is not clear enough to analyze the skin condition." and do not provide any further information.
If the image is not a selfie, please say "The image is not a selfie." and do not provide any further information.
If the image is not a face, please say "The image is not a face." and do not provide any further information.
If the image is not a human face, please say "The image is not a human face." and do not provide any further information.
`;

export const evaluateSelfie = async (image, prompt = PROMPT) => {
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

export async function uploadToSupabase(localPath, destFilename) {
    const fileStream = fs.createReadStream(localPath);
    const { data, error } = await supabase
        .storage
        .from("selfies")
        .upload(destFilename, fileStream, { contentType: "image/jpeg" });

    if (error) throw error;

    const { publicUrl } = supabase
        .storage
        .from("selfies")
        .getPublicUrl(data.path);

    return publicUrl;
}

// const response = await evaluateSelfie("https://cdn.shopify.com/s/files/1/0105/8429/3412/files/4_98aeafba-9579-481f-938d-15329c17632a_480x480.png?v=1617889634")
// console.log(response);