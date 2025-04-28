
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import retriever from "./retriever.js";
import combineDocuments from "./combineDocuments.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env") });

const openAIApiKey = process.env.OPENAI_API_KEY


const llm = new ChatOpenAI({
    api_key: openAIApiKey,
    modelName: 'gpt-3.5-turbo'
})


const answerTemplate = `
You are named Simpli, a helpful assistant only answering to skin-care related questions. Use the provided context to answer the question. Do not make up an answer.
Only if there are no answers, respond with: "I'm sorry, I couldn't find an answer to your question. Please reach out to contact@simplify.com for further assistance. "
Only if the user is greeting, you do not have to respond anything other than greeting and introduction to yourself.
Always:
  • Write in multiple paragraphs  
  • Use bullet lists when enumerating  
  • Indent sub-points under main points  
  • Sprinkle in a relevant emoticon or two
Keep your tone helpful and polite and fun.
Context: {context}
Question: {question}
Answer:
summarize the answer
`;

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
    const response = await chain.invoke({ question: query });
    console.log(response)
    return response
}
export default querySimpli