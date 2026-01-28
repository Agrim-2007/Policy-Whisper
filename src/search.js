const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

const VECTOR_STORE_PATH = path.join(__dirname, '../vector_store.json');

// Cosine Similarity Algorithm
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}


async function retrieve(query, topK = 3) {

    if (!fs.existsSync(VECTOR_STORE_PATH)) {
        throw new Error("Vector store not found. Run ingest.js first.");
    }

    const vectorStore = JSON.parse(fs.readFileSync(VECTOR_STORE_PATH, 'utf-8'));

    const result = await model.embedContent(query);
    const queryEmbedding = result.embedding.values;

    const scoredDocs = vectorStore.map(doc => ({
        ...doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    scoredDocs.sort((a, b) => b.score - a.score);

    return scoredDocs.slice(0, topK);
}

module.exports = { retrieve };

if (require.main === module) {
    (async () => {
        const query = process.argv[2] || "How many leaves are allowed?";
        console.log(`Searching for: "${query}"...`);
        try {
            const results = await retrieve(query);
            console.log("\nTop Result:");
            if (results.length > 0) {
                console.log(`Source: ${results[0].source}`);
                console.log(`Score: ${results[0].score.toFixed(4)}`);
                console.log(`Content: ${results[0].content.substring(0, 100)}...`);
            } else {
                console.log("No results found.");
            }
        } catch (error) {
            console.error(error);
        }
    })();
}
