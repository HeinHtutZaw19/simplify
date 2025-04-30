// utils/retriever.js
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });


import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const openAIApiKey = process.env.OPENAI_API_KEY;
const sbUrl = process.env.SUPABASE_URL_CHATBOT;
const sbApiKey = process.env.SUPABASE_API_KEY;

// Initialize embeddings and Supabase client
const embeddings = new OpenAIEmbeddings({ openAIApiKey });
const client = createClient(sbUrl, sbApiKey);

// Configure the vector store
const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    query_name: 'match_documents',
});

// Create a retriever
const retriever = vectorStore.asRetriever();

// Export the retriever directly
export default retriever;
