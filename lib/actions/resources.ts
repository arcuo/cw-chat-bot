"use server";

export const getEmbeddings = async (input: string) => {

}

// import { db } from "../db";
// import { generateEmbeddings } from "../ai/embedding";
// import { embeddings as embeddingsTable } from "../db/schema/embeddings";

// export const createResource = async (input: NewResourceParams) => {
// 	try {
// 		const { content } = insertResourceSchema.parse(input);

// 		const [resource] = await db
// 			.insert(resources)
// 			.values({ content })
// 			.returning();

// 		const embeddings = await generateEmbeddings(content);
// 		await db.insert(embeddingsTable).values(
// 			embeddings.map((embedding) => ({
// 				resourceId: resource.id,
// 				...embedding,
// 			})),
// 		);

// 		return "Resource successfully created and embedded.";
// 	} catch (e) {
// 		if (e instanceof Error)
// 			return e.message.length > 0 ? e.message : "Error, please try again.";
// 	}
// };
