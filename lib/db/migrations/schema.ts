import { pgTable, index, varchar, text, vector, timestamp, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const embeddings = pgTable("embeddings", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	content: text("content").notNull(),
	embedding: vector("embedding", { dimensions: 768 }).notNull(),
},
(table) => {
	return {
		embeddingIndex: index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops")),
	}
});

export const resumes = pgTable("resumes", {
	hash: varchar("hash", { length: 64 }).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	content: jsonb("content").notNull(),
},
(table) => {
	return {
		hashIndex: index("hashIndex").using("btree", table.hash),
	}
});