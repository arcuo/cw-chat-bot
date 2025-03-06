"use client";
import Link from "next/link";
import { useState, type ComponentProps, type PropsWithChildren } from "react";
import { LinkButton } from "./button";
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion, type Variants } from "motion/react";
import { Tooltip } from "./tooltip";

const NavLink = ({ children, ...rest }: ComponentProps<typeof Link>) => {
	return (
		<motion.div
			whileHover="hover"
			initial="initial"
			whileTap={{ opacity: 0.7, transition: { duration: 0.1 } }}
		>
			<Link {...rest}>{children}</Link>
			<motion.hr
				className="text-amber-500"
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
	hidden: { x: -100, opacity: 0 },
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 1,
			staggerChildren: 0.2,
		},
	},
};

const item: Variants = {
	hidden: { x: -100, opacity: 0 },
	show: {
		opacity: 1,
		x: 0,
		transition: {
			type: "tween",
		},
	},
};

export function Header() {
	const [copied, setCopied] = useState(false);
	return (
		<>
			<motion.div
				className="@container grid grid-cols-4 grid-cols-fr px-8 py-5"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<motion.div
					key="name"
					whileHover="hover"
					initial="initial"
					variants={item}
					className="relative w-fit"
				>
					<Link
						type="button"
						className="block w-fit cursor-pointer text-left"
						href="/"
					>
						<Item title="Name">
							<span>Hugh Benjamin Zachariae</span>
							<span className="text-neutral-700 text-sm">
								Aarhus, Denmark GMT+1
							</span>
						</Item>
					</Link>
					<motion.hr
						className="absolute bottom-0 mt-2 text-amber-500"
						key="underline"
						variants={{
							hover: {
								width: "8em",
							},
							initial: {
								width: 0,
							},
						}}
					/>
				</motion.div>

				<motion.div variants={item} key="situation">
					<Item title="Situation">
						<span>Looking for new opportunities</span>
						<span>Learning new things</span>
					</Item>
				</motion.div>

				{/* Navigation */}
				<motion.nav
					key="nav"
					variants={item}
					className="flex @max-[1650px]:flex-col @max-[1650px]:items-end items-center justify-center @max-[1650px]:gap-2 gap-10 @max-[1650px]:text-sm"
				>
					<NavLink href={"/"}>Home</NavLink>
					<NavLink href={"/resume"}>Resume</NavLink>
					<NavLink href={"/experience"}>Experience</NavLink>
				</motion.nav>

				{/* Links */}

				<motion.div
					key="links"
					variants={item}
					className="flex @max-[1350px]:flex-col @max-[1350px]:items-end items-center justify-end gap-2"
				>
					<address className="@max-[1350px]:mr-0 mr-5 text-sm not-italic">
						<Tooltip content={copied ? "Copied!" : "Click to copy"}>
							<button
								type="button"
								className="cursor-copy"
								onClick={() => {
									navigator.clipboard.writeText("benjamin.zachariae@gmail.com");
									setCopied(true);
									setTimeout(() => setCopied(false), 5000);
								}}
							>
								benjamin.zachariae@gmail.com
							</button>
						</Tooltip>
					</address>
					<div className="@max-[1350px]:flex contents @max-[1350px]:justify-end">
						<LinkButton
							aria-label="Email"
							href="mailto:benjamin.zachariae@gmail.com"
							target="_blank"
							icon
						>
							<EnvelopeClosedIcon />
						</LinkButton>
						<LinkButton
							aria-label="LinkedIn"
							href="https://www.linkedin.com/in/benjamin-zachariae-17591a117/"
							target="_blank"
							icon
						>
							<LinkedInLogoIcon />
						</LinkButton>
						<LinkButton
							aria-label="Github"
							href="https://github.com/arcuo/"
							target="_blank"
							icon
						>
							<GitHubLogoIcon />
						</LinkButton>
					</div>
				</motion.div>
			</motion.div>
			<motion.hr
				className="text-neutral-700/20"
				key="underline"
				animate={{
					width: "100%",
				}}
				initial={{
					width: 0,
				}}
				transition={{
					duration: 1,
					ease: "easeOut",
				}}
			/>
		</>
	);
}

const Item = ({ title, children }: PropsWithChildren & { title: string }) => {
	return (
		<div className="flex flex-col">
			{/* Title */}
			<div className="mb-1 text-neutral-600 text-sm">{title}</div>
			<div className="contents uppercase">{children}</div>
		</div>
	);
};
