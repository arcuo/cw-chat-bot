"use client";
import {
	EnvelopeClosedIcon,
	LinkedInLogoIcon,
	GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { DownloadIcon, MailsIcon } from "lucide-react";
import { motion } from "motion/react";
import { LinkButton } from "./button";
import { Tooltip } from "./tooltip";

export function Footer() {
	return (
		<motion.footer
			className="flex flex-2 items-end justify-center gap-3 py-10"
			id="footer"
		>
			<Tooltip content="The page a bit much? Click here to download the resume!">
				<LinkButton
					className="size-9 rounded-full p-2"
					aria-label="Download PDF"
					href="/files/Resume_Benjamin_Zachariae_March-2025.pdf"
					target="_blank"
					rel="noopener noreferrer"
					icon
				>
					<DownloadIcon />
				</LinkButton>
			</Tooltip>
			<Tooltip content="Send me an email!">
				<LinkButton
					className="size-9 rounded-full p-2"
					aria-label="Email"
					href="mailto:benjamin.zachariae@gmail.com"
					target="_blank"
					icon
				>
					<MailsIcon />
				</LinkButton>
			</Tooltip>
			<Tooltip content="Connect with me on LinkedIn!">
				<LinkButton
					className="size-9 rounded-full p-2"
					aria-label="LinkedIn"
					href="https://www.linkedin.com/in/benjamin-zachariae-17591a107/"
					target="_blank"
					icon
				>
					<LinkedInLogoIcon />
				</LinkButton>
			</Tooltip>
			<Tooltip content="Check out my Github!">
				<LinkButton
					className="size-9 rounded-full p-2"
					aria-label="Github"
					href="https://github.com/arcuo/"
					target="_blank"
					icon
				>
					<GitHubLogoIcon />
				</LinkButton>
			</Tooltip>
		</motion.footer>
	);
}
