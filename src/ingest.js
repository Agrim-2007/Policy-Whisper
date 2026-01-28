const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

const DATA_DIR = path.join(__dirname, '../data');
const VECTOR_STORE_PATH = path.join(__dirname, '../vector_store.json');

async function ingest() {
    if (!fs.existsSync(DATA_DIR)) {
        console.error("Data directory not found!");
        return;
    }

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.txt'));
    const vectorStore = [];

    console.log(`Found ${files.length} documents. Processing...`);

    for (const file of files) {
        const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8').trim();
        console.log(`Embedding ${file}...`);

        try {
            const result = await model.embedContent(content);
            vectorStore.push({ content, source: file, embedding: result.embedding.values });
        } catch (error) {
            console.error(`Failed to embed ${file}:`, error.message);
        }
    }

    fs.writeFileSync(VECTOR_STORE_PATH, JSON.stringify(vectorStore, null, 2));
    console.log(`Ingestion complete. Saved ${vectorStore.length} documents to ${VECTOR_STORE_PATH}`);
}

ingest();
