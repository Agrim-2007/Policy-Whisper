require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is missing in .env ");
    process.exit(1);
}

module.exports = {
    geminiApiKey: process.env.GEMINI_API_KEY
};
