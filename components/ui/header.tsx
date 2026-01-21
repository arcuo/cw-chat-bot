"use client";
import type { ComponentProps, PropsWithChildren } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
			className="@container relative mb-2 grid grid-cols-2 items-center bg-white px-15 py-8 max-sm:flex max-sm:justify-between max-sm:whitespace-nowrap max-sm:px-5 max-sm:py-5 max-lg:px-5"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<Item key="name" className="flex flex-row items-center gap-2 sm:gap-6">
				<motion.div variants={item} whileHover={{scale: 1.1}} className="z-10" >
					<Image
						src="/avatar.png"
						alt="Avatar of Benjamin Zachariae"
						width={70}
						height={70}
						className="rounded-full"
						loading="eager"
					/>
				</motion.div>
				<div className="flex flex-col">
					<motion.span variants={item} className="text-lg">
						Benjamin Zachariae
					</motion.span>
					<motion.span variants={item} className="text-neutral-700 text-xs">
						Aarhus, Denmark GMT+1
					</motion.span>
				</div>
			</Item>

			<motion.div className="flex gap-4 justify-self-end" variants={item}>
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
	PropsWithChildren<{ title?: string }>) => {
	return (
		<motion.div className={cn("flex flex-col", className)} {...rest}>
			{/* Title */}
			{title && <div className="text-neutral-600">{title}</div>}
			{children}
		</motion.div>
	);
};
