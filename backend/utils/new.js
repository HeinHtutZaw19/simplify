import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import retriever from "./retriever.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });
const openAIApiKey = process.env.OPENAI_API_KEY;

// Initialize LLM
const llm = new ChatOpenAI({
    apiKey: openAIApiKey,
    modelName: 'gpt-3.5-turbo',
});

// Memory to store chat history and user attributes
const memory = new BufferMemory({
    memoryKey: 'chat_history',         // key under which history is stored
    returnMessages: true,              // return history as messages
    inputKey: 'question',              // name of input field
    outputKey: 'text',                 // name of LLM output field
});

// Custom prompt to include context + history
const QA_PROMPT = `You are named Simpli, a helpful, enthusiastic assistant bot only answering skin-care related questions.
Use the provided context and the conversation history to answer the question. Do not make up information.
If the answer is in the context, prioritize it. Otherwise, check the conversation history.

Context: {context}
Conversation History:
{chat_history}

Question: {question}
Answer concisely (max 50 words), in multiple paragraphs, using bullet lists and emoticons when appropriate. `;

const qaPrompt = PromptTemplate.fromTemplate(QA_PROMPT);

// Build a conversational retrieval QA chain with memory
const qaChain = ConversationalRetrievalQAChain.fromLLM(
    llm,
    retriever,
    {
        memory,
        combineDocumentsChainOptions: {
            prompt: qaPrompt,
            inputVariables: ['context', 'chat_history', 'question'],
        }
    }
);

// Greeting logic remains same
const greetingResponse = "Hi, I'm Simpli! I am your personal skin-care assistant 😊";

// Main query function
const querySimpli = async (query) => {
    // Simple greeting detection
    const lower = query.trim().toLowerCase();
    if (/(^hi$|^hey$|^good (morning|evening))/i.test(lower)) {
        return greetingResponse;
    }

    // Otherwise, run through the conversational QA chain
    const result = await qaChain.call({ question: query });
    return result.text;
};

export default querySimpli;
