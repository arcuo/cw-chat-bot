import type { Metadata } from "next";
import { CreateResumeView } from "@/components/views/resumeForm";

// TODO: Add premade resumes for Tech lead, Frontender, Full stack. Should link to premade resumes in the database.

export const metadata: Metadata = {
	title: "Create resume",
	description: "Create a tailored resume",
};

export default function CreateResume() {
	return <CreateResumeView />;
}
