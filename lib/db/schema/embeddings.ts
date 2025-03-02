import { nanoid } from "@/lib/utils";
import {
	index,
	pgEnum,
	pgTable,
	text,
	varchar,
	vector,
} from "drizzle-orm/pg-core";

// Create table for each file in the `scripts/resume_files` directory

export const titleEnum = pgEnum("title", [
	"codingStyle",
	"education",
	"personality",
	"projects",
	"skills",
	"workExperience",
]);

export type EmbeddingTitle = (typeof titleEnum)["enumValues"][number];

export const embeddings = pgTable(
	"embeddings",
	{
		id: varchar("id", { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		content: text("content").notNull(),
		embedding: vector("embedding", { dimensions: 768 }).notNull(),
		title: titleEnum("title").notNull(),
	},
	(table) => ({
		embeddingIndex: index("embedding.index").using(
			"hnsw",
			table.embedding.op("vector_cosine_ops"),
		),
		titleIndex: index("embedding.title.index").on(table.title),
	}),
);
