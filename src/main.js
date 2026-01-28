const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { retrieve } = require('./search');
const { generateAnswer } = require('./llm');

const rl = readline.createInterface({ input, output });

async function main() {
    console.log("Welcome to Policy Whisperer (Gemini Edition)!");
    console.log("Type 'exit' to quit.\n");

    while (true) {
        const query = await rl.question('Ask a question: ');
        if (query.toLowerCase() === 'exit') break;

        console.log("\nSearching policies...");
        try {
            const contextDocs = await retrieve(query, 3);
            if (contextDocs.length === 0) {
                console.log("No relevant documents found.\n");
                continue;
            }

            console.log("Thinking...");
            const answer = await generateAnswer(query, contextDocs);
            console.log("\nAnswer:\n" + answer + "\n\n" + "-".repeat(50) + "\n");
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    rl.close();
}

if (require.main === module) main();
