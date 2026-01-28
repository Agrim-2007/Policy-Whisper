# Policy Whisperer - RAG System

A Retrieval-Augmented Generation (RAG) system built with Node.js and Google's Gemini AI that allows users to query company policy documents and receive accurate answers with proper source citations.

## Features

- 🔍 **Semantic Search**: Uses vector embeddings and cosine similarity to find relevant policy documents
- 🤖 **AI-Powered Answers**: Leverages Gemini 2.5 Flash Lite to generate accurate responses
- 📚 **Source Citations**: All answers include proper citations to source documents
- 🛡️ **Guardrails**: Handles irrelevant queries appropriately
- 🧪 **Automated Testing**: Includes verification tests for quality assurance

## Architecture

The system consists of three main components:

1. **Ingestion Pipeline** (`ingest.js`) - Processes policy documents and generates embeddings
2. **Search/Retrieval** (`search.js`) - Performs semantic search using cosine similarity
3. **Answer Generation** (`llm.js`) - Uses Gemini AI to generate contextual answers with citations

## Setup

### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd RAG-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY='your-api-key-here'
```

4. Generate the vector store (if not included):
```bash
node src/ingest.js
```

## Usage

### Interactive Mode

Run the interactive CLI to ask questions:

```bash
node src/main.js
```

Type your questions and the system will search policies and provide answers. Type `exit` to quit.

### Run Verification Tests

Test the entire pipeline:

```bash
node src/verify_pipeline.js
```

### Test Search Only

Test just the retrieval functionality:

```bash
node src/search.js "your question here"
```

## Project Structure

```
RAG-project/
├── src/
│   ├── config.js           # Configuration and environment variables
│   ├── ingest.js           # Document ingestion and embedding generation
│   ├── search.js           # Semantic search using cosine similarity
│   ├── llm.js              # LLM integration for answer generation
│   ├── main.js             # Interactive CLI application
│   └── verify_pipeline.js  # Automated test suite
├── data/                   # Policy documents (*.txt files)
├── vector_store.json       # Pre-built embeddings database
├── .env                    # Environment variables (not in git)
├── .gitignore
├── package.json
└── README.md
```

## Example Queries

- "How many sick leaves do I get?"
- "What are the security policies?"
- "What is the policy on social media and remote work availability?"

## Technologies Used

- **Node.js** - Runtime environment
- **Google Gemini AI** - Embeddings (`gemini-embedding-001`) and text generation (`gemini-2.5-flash-lite`)
- **Express.js** - Web server capabilities
- **dotenv** - Environment variable management

## License

ISC
