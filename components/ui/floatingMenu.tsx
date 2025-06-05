"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, LinkButton } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
	label: string;
	href: string;
	Icon?: React.ReactNode;
};

type FloatingActionMenuProps<Options extends Option[] = Option[]> = {
	options: Options;
	className?: string;
	selected: Options[number]["label"];
};

const FloatingActionMenu = ({
	options,
	className,
	selected,
}: FloatingActionMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const selectedOption = options.find((option) => option.label === selected);

	return (
		<div className={cn("", className)}>
			<Button onClick={toggleMenu} className="rounded-full p-[5px]">
				<motion.div
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
						type: "spring",
						stiffness: 300,
						damping: 20,
					}}
				>
					<AnimatePresence initial={false} mode="wait">
						<motion.div
							key={selectedOption?.href}
							initial={{ opacity: 0, filter: "blur(10px)" }}
							animate={{ opacity: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, filter: "blur(10px)" }}
						>
							{selectedOption?.Icon ?? <Menu className="size-4" />}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
						animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
						transition={{
							duration: 0.2,
							type: "spring",
							stiffness: 300,
							damping: 20,
						}}
						className="absolute top-10 right-0 z-10 mb-2"
					>
						<div className="z-10 flex flex-col items-end gap-2">
							{options.map((option, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{
										duration: 0.3,
										delay: index * 0.05,
									}}
								>
									<LinkButton
										href={option.href}
										onClick={toggleMenu}
										className="flex items-center gap-2 rounded-xl bg-white"
									>
										{option.Icon}
										<span>{option.label}</span>
									</LinkButton>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FloatingActionMenu;
