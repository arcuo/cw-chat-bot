import { db } from "..";
import { resumes } from "../schema/resumes";
import { eq } from "drizzle-orm";
import { SHA256 } from "crypto-js";
import type { Resume } from "@/lib/schemas/resume";

export const insertResume = async (resume: string) => {
	const result = await db
		.insert(resumes)
		.values([
			{
				hash: SHA256(resume).toString(),
				content: resume,
			},
		])
		.returning({ hash: resumes.hash });

	return result[0].hash;
};

export const getResume = async (hash: string) => {
	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.hash, hash),
	});

	if (!resume) return null;

	return JSON.parse(resume.content as string) as Resume;
};
