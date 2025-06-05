"use client";
import type { ComponentProps, PropsWithChildren } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { FileImage, Home, House, LogOut, Settings, User } from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import FloatingActionMenu from "./floatingMenu";

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
	hidden: { x: -100, opacity: 0 },
	show: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			duration: 0.6,
			staggerChildren: 0.2,
		},
	},
};

const NavLink = ({
	href,
	children,
	className,
}: PropsWithChildren<{ href: string; className?: string }>) => {
	const pathname = usePathname();
	const isSelected = pathname.includes(href);

	return (
		<Link href={href} className={cn("relative", className)} prefetch>
			{children}
			{isSelected && (
				<motion.hr
					layoutId="nav-link-line"
					className="absolute bottom-0 left-0 w-full text-neutral-400"
				/>
			)}
		</Link>
	);
};

export function Header() {
	const pathname = usePathname();
	return (
		<motion.header
			id="header"
			className="@container relative grid grid-cols-2 items-center bg-white px-15 py-8 max-sm:flex max-sm:justify-between max-sm:whitespace-nowrap max-sm:px-5 max-sm:py-5"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<Item title="" key="name" className="relative justify-self-start">
				<motion.span variants={item} className="text-lg">
					Benjamin Zachariae
				</motion.span>
				<motion.span variants={item} className="text-neutral-700 text-xs">
					Aarhus, Denmark GMT+1
				</motion.span>
			</Item>

			<motion.div className="flex gap-4 justify-self-end" variants={item}>
				<div className="hidden sm:contents">
					<NavLink href="/home">Home</NavLink>
					<NavLink href="/resume" className="mr-10">
						Resume
					</NavLink>
				</div>

				<a href="https://github.com/arcuo" target="_blank" rel="noreferrer">
					<GitHubLogoIcon aria-label="Github/arcuo" className="size-6" />
				</a>
				<a
					href="https://www.linkedin.com/in/benjamin-zachariae-17591a117"
					target="_blank"
					rel="noreferrer"
				>
					<LinkedInLogoIcon
						aria-label="LinkedIn/Benjamin Zachariae"
						className="size-6"
					/>
				</a>
				<div className="contents sm:hidden">
					<FloatingActionMenu
						selected={pathname === "/home" ? "Home" : pathname.includes("/resume") ? "Resume" : "Account"}
						className="relative"
						options={[
							{
								label: "Home",
								Icon: <House className="size-4" />,
								href: "/home",
							},
							{
								label: "Resume",
								Icon: <Settings className="size-4" />,
								href: "/resume",
							},
						]}
					/>
				</div>
			</motion.div>
		</motion.header>
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
			<div className="text-neutral-600">{title}</div>
			{children}
		</motion.div>
	);
};
