import type { Metadata, ResolvingMetadata } from "next";
import { getResume } from "../resumeAction";
import { ResumeView } from "@/components/views/resumeView";

type Props = {
	params: Promise<{ resumeId: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { resumeId } = await params;
	const resume = await getResume(resumeId);

	return {
		title: resume.title.pageTitle ?? "Tailored resume",
		description: "Tailored resume",
	};
}

export default async function TailoredResumePage({ params }: Props) {
	const { resumeId } = await params;

	const resume = await getResume(resumeId);

	return <ResumeView resume={resume} />;
}
