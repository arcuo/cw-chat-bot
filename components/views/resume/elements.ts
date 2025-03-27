import { atom } from "jotai";
import {
	AwardIcon,
	CpuIcon,
	FolderKanbanIcon,
	MailboxIcon,
	TimerIcon,
} from "lucide-react";

export const elements = {
	skills: {
        id: "skills",
		title: "Technical skills",
		icon: CpuIcon,
	},
	projects: {
        id: "projects",
		title: "Notable Projects",
		icon: FolderKanbanIcon,
	},
	timeline: {
        id: "timeline",
		title: "Experiences and Education",
		icon: TimerIcon,
	},
	features: {
        id: "features",
		title: "Technical features",
		icon: AwardIcon,
	},
	footer: {
        id: "footer",
		title: "Contacts",
		icon: MailboxIcon,
	},
} as const;

const elementIds = Object.keys(elements) as (keyof typeof elements)[];

export const selectedElementEd = atom(elementIds[0]);
