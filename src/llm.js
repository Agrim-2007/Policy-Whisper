const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

async function generateAnswer(query, contextDocs) {
    // Construct the context string
    let contextText = "";
    contextDocs.forEach(doc => {
        contextText += `Source: ${doc.source}\nContent: ${doc.content}\n---\n`;
    });

    const prompt = `
You are a helpful assistant for the "Policy Whisperer" system.
Your goal is to answer user questions strictly based on the provided context.

Rules:
1. Answer ONLY using the information from the provided context.
2. If the answer is not present in the context, say "I don't have evidence in the provided documents."
3. You MUST cite the source file for every piece of information you use. Use the format: "According to [filename]..." or "(Source: [filename])".
4. If the answer requires combining information from multiple files, cite all relevant files.

Context:
${contextText}

User Question: ${query}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating answer:", error);
        return "Sorry, I encountered an error while generating the answer.";
    }
}

module.exports = { generateAnswer };
