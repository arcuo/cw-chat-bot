import * as t from "drizzle-orm/pg-core";

/** Stores resumes by their hash */
export const resumes = t.pgTable(
	"resumes",
	{
		id: t.serial("id").primaryKey(),
		hash: t.varchar("hash", { length: 64 }).notNull(),
		createdAt: t.timestamp("createdAt").defaultNow().notNull(),
		content: t.jsonb("content").notNull(),
	},
	(table) => ({
		hashIndex: t.index("hashIndex").on(table.hash),
	}),
);
