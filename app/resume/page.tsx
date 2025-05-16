import { ResumeView } from "@/components/views/resume/resumeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resume",
	description: "Software Developer Resume",
};

export default function ResumePage() {
	return <ResumeView />;
}
