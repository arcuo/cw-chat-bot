CREATE TABLE IF NOT EXISTS "projects" (
	"uuid" varchar(191) PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(768) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "base_resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" varchar(32) NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" varchar(32) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"title" jsonb NOT NULL,
	"prompt" text NOT NULL,
	"cover" text NOT NULL,
	"skillSimilarities" jsonb NOT NULL,
	"projectSimilarities" jsonb NOT NULL,
	CONSTRAINT "resumes_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"uuid" varchar(191) PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(768) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "base_resumes" ADD CONSTRAINT "base_resumes_hash_resumes_hash_fk" FOREIGN KEY ("hash") REFERENCES "public"."resumes"("hash") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects.embedding.index" ON "projects" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects.id" ON "projects" USING btree ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "skills.embedding.index" ON "skills" USING hnsw ("embedding" vector_cosine_ops);