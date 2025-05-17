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
// const ITEMS_INSTRUCTIONS_PATH = resolve(__dirname, "../../resources/info.txt");
const FILTERED_ITEMS_PATH = resolve(__dirname, "../../resources/filtered_info.txt");
const RECOMMENDATIONS_PATH = resolve(__dirname, "../../resources/recommendations.txt");

async function loadSources() {
    // const rawItems = await fs.promises.readFile(ITEMS_PATH, "utf8");
    // const items = JSON.parse(rawItems);
    // const itemsText = Array.isArray(items)
    //     ? items.map(i => JSON.stringify(i)).join("\n\n")  // or format as you like
    //     : rawItems;

    // const articlesText = await fs.promises.readFile(ARTICLES_PATH, "utf8");
    // return [itemsText, articlesText];
    const infoItems = await fs.promises.readFile(ITEMS_PATH, "utf8");
    const articles = await fs.promises.readFile(ARTICLES_PATH, "utf8");
    const filteredItems = await fs.promises.readFile(FILTERED_ITEMS_PATH, "utf8");
    const recommendations = await fs.promises.readFile(RECOMMENDATIONS_PATH, "utf8");
    return [filteredItems, recommendations];
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
async function delete_table() {

    const sbUrl = process.env.SUPABASE_URL_CHATBOT;
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const client = createClient(sbUrl, sbApiKey);
    await client.from("documents").delete().neq("id", "");
    await client.from("documents").delete().eq("metadata->>source", "articles.txt");
}

ingest()