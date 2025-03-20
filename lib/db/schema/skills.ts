import { index, pgTable, text, varchar, vector } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const skillsSchema = pgTable(
	"skills",
	{
		uuid: varchar("uuid", { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		key: text("key").notNull(),
		content: text("content").notNull(),
		embedding: vector("embedding", { dimensions: 768 }).notNull(),
	},
	(table) => ({
		embeddingIndex: index("skills.embedding.index").using(
			"hnsw",
			table.embedding.op("vector_cosine_ops"),
		),
	}),
);
