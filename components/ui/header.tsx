"use client";
import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";
import { LinkButton } from "./button";
import {
	DownloadIcon,
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { EmailCopy } from "./emailCopy";
import { Tooltip } from "./tooltip";

const NavLink = ({ children, href, ...rest }: ComponentProps<typeof Link>) => {
	const pathname = usePathname();
	const selected = pathname === href;
	return (
		<motion.div
			whileHover="hover"
			initial="initial"
			whileTap={{ opacity: 0.7, transition: { duration: 0.1 } }}
		>
			<Link
				href={href}
				{...rest}
				className={cn("transition-colors", {
					"pointer-events-none text-amber-700": selected,
				})}
			>
				{children}
			</Link>
			<motion.hr
				className="text-amber-700"
				key="underline"
				variants={{
					hover: {
						width: "100%",
					},
					initial: {
						width: 0,
					},
				}}
			/>
		</motion.div>
	);
};

const container: Variants = {
	hidden: {},
	show: {
		transition: {
			duration: 1,
			staggerChildren: 0.2,
		},
	},
};

const item: Variants = {
	hidden: { y: -100, opacity: 0 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export function Header() {
	return (
		<>
			<motion.header
				className="@container relative grid @max-[900px]:grid-cols-3 grid-cols-4 grid-cols-fr gap-4 bg-white px-8 py-5 shadow-xs max-sm:flex max-sm:justify-between max-sm:whitespace-nowrap max-sm:px-4 max-sm:py-4"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<Item
					title="Name"
					key="name"
					className="relative w-fit"
					variants={item}
				>
					<span>Hugh Benjamin Zachariae</span>
					<span className="text-neutral-700 text-xs">
						Aarhus, Denmark GMT+1
					</span>
				</Item>

				<Item
					title="Contact"
					key="contacts"
					className="max-sm:hidden"
					variants={item}
				>
					<address className="flex flex-col text-left not-italic">
						<a href="tel:+4521181058">+45 21 18 10 58</a>
						<EmailCopy />
					</address>
				</Item>

				<Item
					title="Situation"
					variants={item}
					key="situation"
					className="@max-[900px]:hidden"
				>
					<span>Exploring AI, RAG and more</span>
					<span>Looking for new opportunities</span>
				</Item>

				{/* Navigation */}
				{/* <motion.nav
					key="nav"
					variants={item}
					className="flex @max-[1650px]:flex-col @max-[1650px]:items-end items-center justify-center @max-[1650px]:gap-2 gap-10 @max-[1650px]:text-sm"
				>
					<NavLink href={"/"}>Home</NavLink>
					<NavLink href={"/resume"}>Resume</NavLink>
					<NavLink href={"/experience"}>Experience</NavLink>
				</motion.nav> */}

				{/* Links */}

				<motion.div
					key="links"
					variants={item}
					className="col-start-4 flex @max-[850px]:flex-wrap items-center justify-end gap-2"
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
							<EnvelopeClosedIcon />
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
				</motion.div>
				<motion.hr
					className="absolute right-0 bottom-0 left-0 text-amber-700/15"
					key="underline"
					animate={{
						width: "100%",
					}}
					initial={{
						width: 0,
					}}
					transition={{
						duration: 2,
						ease: "easeOut",
					}}
				/>
			</motion.header>
		</>
	);
}

const Item = ({
	title,
	children,
	className,
	...rest
}: ComponentProps<typeof motion.div> &
	PropsWithChildren<{ title: string }>) => {
	return (
		<motion.div className={cn("flex flex-col", className)} {...rest}>
			{/* Title */}
			<div className="mb-1 text-neutral-600 text-sm">{title}</div>
			<div className="contents uppercase">{children}</div>
		</motion.div>
	);
};
