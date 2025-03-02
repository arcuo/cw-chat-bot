DO $$ BEGIN
 CREATE TYPE "public"."title" AS ENUM('codingStyle', 'education', 'personality', 'projects', 'skills', 'workExperience');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "embeddings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(768) NOT NULL,
	"title" "title" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" varchar(64) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"content" varchar(10000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "embedding.index" ON "embeddings" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "embedding.title.index" ON "embeddings" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hashIndex" ON "resumes" USING btree ("hash");