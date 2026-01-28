const { retrieve } = require('./search');
const { generateAnswer } = require('./llm');

async function testQuery(query, description) {
    console.log(`\n--- Test: ${description} ---`);
    console.log(`Query: "${query}"`);

    try {
        const contextDocs = await retrieve(query, 3);
        if (contextDocs.length === 0) {
            console.log("Result: No documents found.");
            return;
        }

        const answer = await generateAnswer(query, contextDocs);
        console.log("Answer:", answer);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function runVerification() {
    console.log("Starting Automated Verification...");

    // 1. Single Source Citation
    await testQuery(
        "How many sick leaves do I get?",
        "Single Source (Leave Policy)"
    );

    // 2. Multi-Source Reasoning
    await testQuery(
        "What is the policy on social media and remote work availability?",
        "Multi-Source (Code of Conduct + Remote Work)"
    );

    // 3. Guardrails (No Evidence)
    await testQuery(
        "How do I bake a cake?",
        "Guardrails (Irrelevant Query)"
    );
}

runVerification();
