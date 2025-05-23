import type { Metadata, ResolvingMetadata } from "next";
import { getResume } from "../resumeAction";
import { ResumeView } from "@/components/views/resume/resumeView";

type Props = {
	params: Promise<{ resumeHash: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { resumeHash } = await params;
	const resume = await getResume(resumeHash);

	if (!resume) {
		return {
			title: "Resume not found",
			description: "Resume not found",
		};
	}

	return {
		title: resume.title.pageTitle ?? "Tailored resume",
		description: "Tailored resume",
	};
}

export default async function TailoredResumePage({ params }: Props) {
	const { resumeHash } = await params;

	const resume = await getResume(resumeHash);

	if (!resume) {
		return <div>Resume not found</div>;
	}

	return <ResumeView resume={resume} />;
}
