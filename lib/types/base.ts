import type { RelevanceScore } from "@/components/ui/relevanceIndicator";
import type { ReactNode } from "react";

/** Base information needed for a section */
export type Base = {
	/** The title of the section */
	title: string;
	/** Catchy subtitle for the section */
	subtitle: string;
	/** The content of the section */
	content: ReactNode[];

	// Estimated cosine similarity to the user prompt
	similarity?: number;
	// Relevance of the section computed from similarity
	relevance?: RelevanceScore;
};
