import { PageTranstionWrapper } from "@/components/ui/pageTransitionWrapper";
import { ResumeView } from "@/components/views/resumeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resume",
	description: "Software Developer Resume",
}

export default function ResumePage() {
	return (
		<PageTranstionWrapper>
			<ResumeView />
		</PageTranstionWrapper>
	);
}
