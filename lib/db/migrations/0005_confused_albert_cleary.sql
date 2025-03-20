DROP INDEX IF EXISTS "resumes.hashIndex";--> statement-breakpoint
ALTER TABLE "resumes" DROP COLUMN IF EXISTS "hash";