// Test script to find embeddings
import { findRelevantContent } from "../ai/embedding";

(async () => {
	const userInput = "Have you worked with rust?";
	const results = await findRelevantContent([userInput], 10);
	console.log(results);
})();
