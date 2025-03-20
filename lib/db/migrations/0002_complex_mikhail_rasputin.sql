CREATE TABLE IF NOT EXISTS "projects" (
	"uuid" varchar(191) PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(768) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"uuid" varchar(191) PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(768) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects.embedding.index" ON "projects" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects.id" ON "projects" USING btree ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "skills.embedding.index" ON "skills" USING hnsw ("embedding" vector_cosine_ops);