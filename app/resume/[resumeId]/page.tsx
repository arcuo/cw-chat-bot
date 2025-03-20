import { RelevanceIndicator } from "@/components/ui/relevanceIndicator";
import { projects } from "@/lib/data/projects";
import { similarityToRelevance } from "@/lib/data/similarity";
import { skills } from "@/lib/data/skills";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema/resumes";
import { eq } from "drizzle-orm";
import { getResume } from "../resumeAction";
import { ResumeView } from "@/components/views/resumeView";

export default async function TailoredResumePage({
	params,
}: { params: Promise<{ resumeId: string }> }) {
	const { resumeId } = await params;

	const resume = await getResume(resumeId);

	return <ResumeView resume={resume} />;
}
