import type { ResumeTitle } from "@/app/resume/resumeAction";
import type { Similarity } from "@/lib/data/similarity";
import type { InferSelectModel } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export type Resume = InferSelectModel<typeof resumes>;

type DBSimilarity = Omit<Similarity, "content">

/** Stores resumes by their hash */
export const resumes = t.pgTable(
	"resumes",
	{
		id: t.serial("id").primaryKey(),
		createdAt: t.timestamp("createdAt").defaultNow().notNull(),
		title: t.jsonb("title").$type<ResumeTitle>().notNull(),
		prompt: t.text("prompt").notNull(),
		cover: t.text("cover").notNull(),
		skillSimilarities: t
			.jsonb("skillSimilarities")
			.$type<DBSimilarity[]>()
			.notNull(),
		projectSimilarities: t
			.jsonb("projectSimilarities")
			.$type<DBSimilarity[]>()
			.notNull(),
	},
	// (table) => ({
	// 	hashIndex: t.index("resumes.hashIndex").on(table.hash),
	// }),
);
