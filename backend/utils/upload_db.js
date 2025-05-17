import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env
dotenv.config({ path: resolve(__dirname, "../../.env") });

// Paths
const ITEMS_PATH = resolve(__dirname, "../../resources/items.json");
const ARTICLES_PATH = resolve(__dirname, "../../resources/articles.txt");

async function loadSources() {
    const rawItems = await fs.promises.readFile(ITEMS_PATH, "utf8");
    const items = JSON.parse(rawItems);
    const itemsText = Array.isArray(items)
        ? items.map(i => JSON.stringify(i)).join("\n\n")  // or format as you like
        : rawItems;

    const articlesText = await fs.promises.readFile(ARTICLES_PATH, "utf8");
    return [itemsText, articlesText];
}

async function ingest() {
    try {
        const sources = await loadSources();
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ["\n\n", "\n", " ", ""],
            chunkOverlap: 50,
        });
        const docsArrays = await Promise.all(
            sources.map(src => splitter.createDocuments([src]))
        );
        const allDocs = docsArrays.flat();
        const sbUrl = process.env.SUPABASE_URL_CHATBOT;
        const sbApiKey = process.env.SUPABASE_API_KEY;
        const openAIApiKey = process.env.OPENAI_API_KEY;
        if (!sbUrl || !sbApiKey || !openAIApiKey) {
            throw new Error("Missing one of SUPABASE_URL_CHATBOT, SUPABASE_API_KEY, OPENAI_API_KEY");
        }
        const client = createClient(sbUrl, sbApiKey);
        await SupabaseVectorStore.fromDocuments(
            allDocs,
            new OpenAIEmbeddings({ openAIApiKey }),
            { client, tableName: "documents" }
        );

        console.log("Ingestion complete for items.json + articles.txt!");
    } catch (err) {
        console.error("Ingestion error:", err);
    }
}

ingest();
