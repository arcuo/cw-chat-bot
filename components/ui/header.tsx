"use client";
import Link from "next/link";
import type { ComponentProps, HTMLAttributes } from "react";
import { Button, LinkButton } from "./button";
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { EmailCopy } from "./emailCopy";
import { Construction } from "lucide-react";
import { Popup } from "./popup";

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
	return (
		<>
			<motion.div
				className="@container grid grid-cols-4 grid-cols-fr gap-2 px-8 py-5 shadow-xs"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<motion.div key="name" className="relative w-fit">
					<Item title="Name">
						<span>Hugh Benjamin Zachariae</span>
						<span className="text-neutral-700 text-xs">
							Aarhus, Denmark GMT+1
						</span>
					</Item>
				</motion.div>

				<motion.div variants={item} key="situation">
					<Item title="Situation">
						<span>Exploring AI, RAG and more</span>
						<span>Looking for new opportunities</span>
					</Item>
				</motion.div>

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

				<Item title="Contact" className="@max-[900px]:hidden">
					<address className="flex flex-col text-left not-italic">
						<a href="tel:+4521181058">+45 21 18 10 58</a>
						<EmailCopy />
					</address>
				</Item>

				{/* Links */}

				<motion.div
					key="links"
					variants={item}
					className="col-start-4 flex @max-[850px]:flex-wrap items-center justify-end gap-2"
				>
					<Popup
						className="focus:outline-none"
						content={
							<div className="flex items-center gap-2 text-sm">
								The page is currently under construction.
							</div>
						}
						defaultOpen
					>
						<Button
							icon
							className="size-9 rounded-full bg-orange-300 p-2 text-orange-950"
						>
							<Construction size={20} />
						</Button>
					</Popup>
					<LinkButton
						className="size-9 rounded-full p-2"
						aria-label="Email"
						href="mailto:benjamin.zachariae@gmail.com"
						target="_blank"
						icon
					>
						<EnvelopeClosedIcon />
					</LinkButton>
					<LinkButton
						className="size-9 rounded-full p-2"
						aria-label="LinkedIn"
						href="https://www.linkedin.com/in/benjamin-zachariae-17591a107/"
						target="_blank"
						icon
					>
						<LinkedInLogoIcon />
					</LinkButton>
					<LinkButton
						className="size-9 rounded-full p-2"
						aria-label="Github"
						href="https://github.com/arcuo/"
						target="_blank"
						icon
					>
						<GitHubLogoIcon />
					</LinkButton>
				</motion.div>
			</motion.div>
			<motion.hr
				className="-mt-[8px] text-amber-700/15"
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
		</>
	);
}

const Item = ({
	title,
	children,
	className,
	...rest
}: HTMLAttributes<HTMLDivElement> & { title: string }) => {
	return (
		<div className={cn("flex flex-col", className)} {...rest}>
			{/* Title */}
			<div className="mb-1 text-neutral-600 text-sm">{title}</div>
			<div className="contents uppercase">{children}</div>
		</div>
	);
};
