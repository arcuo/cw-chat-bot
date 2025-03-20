ALTER TABLE "resumes" RENAME COLUMN "content" TO "title";--> statement-breakpoint
DROP INDEX IF EXISTS "hashIndex";--> statement-breakpoint
ALTER TABLE "resumes" ADD COLUMN "cover" text NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resumes.hashIndex" ON "resumes" USING btree ("hash");