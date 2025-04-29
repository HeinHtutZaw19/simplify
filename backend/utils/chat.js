
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import retriever from "./retriever.js";
import combineDocuments from "./combineDocuments.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { OpenAIEmbeddings } from "@langchain/openai"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });

const openAIApiKey = process.env.OPENAI_API_KEY

const llm = new ChatOpenAI({
    api_key: openAIApiKey,
    modelName: 'gpt-3.5-turbo'
})


const greetingResponse = "Hi, I'm Simpli! I am your personal skin-care assistant 😊";
const answerTemplate = `
You are named Simpli, a helpful assistant only answering to skin-care related questions. Use the provided context to answer the question. Do not make up an answer. Return empty string if you have no information on the query.
If there are answers, 
    Always:
    • Write in multiple paragraphs  
    • Use bullet lists when enumerating  
    • Indent sub-points under main points  
    • Sprinkle in a relevant emoticon or two
    Keep your tone helpful and polite and fun.
    Summarize the answers concisely with maximum of 50 words.
If there is no answer respond with:
    "I'm sorry, I couldn't find an answer to your question. Please reach out to contact@simplify.com for further assistance💖."
Context: {context}
Question: {question}
Answer:
`;

async function getEmbedding(text) {
    const embeddings = new OpenAIEmbeddings("text-embedding-3-small")
    return embeddings.embedQuery(text)
}

// Cosine similarity function
function cosineSimilarity(vecA, vecB) {
    const dot = vecA.reduce((acc, val, idx) => acc + val * vecB[idx], 0);
    const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dot / (magA * magB);
}

async function isGreeting(message) {
    const greetings = ["hi", "hey", "good morning", "good evening"];

    const messageEmbedding = await getEmbedding(message);

    for (const greet of greetings) {
        const greetEmbedding = await getEmbedding(greet);
        const similarity = cosineSimilarity(messageEmbedding, greetEmbedding);
        if (similarity > 0.8) {
            return true;
        }
    }
    return false;
}

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

const standaloneQuestionTemplate = " Given a question, convert it to a standalone question. Question : {question} standalone question: "
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)
const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser())

const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocuments
])
const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())

const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough()
    },
    {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question
    },
    answerChain
])

// const response = await chain.invoke({ question: "" })
// console.log(response)

const querySimpli = async (query) => {
    const flag = await isGreeting(query)
    if (flag) {
        console.log("this is greeting")
        return greetingResponse;
    }
    const response = await chain.invoke({ question: query });
    return response
}
export default querySimpli