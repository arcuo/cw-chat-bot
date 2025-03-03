import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Title } from "@/components/ui/title";

const roboto_condensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Hugh Benjamin Zachariae",
	description: "Homepage",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					roboto_condensed.className,
					"scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-thin h-full w-full",
				)}
			>
				<div className="flex h-full flex-col gap-2 overflow-auto px-[5rem] py-[15rem]">
					<Title />
					<hr className="mb-5 w-40 border-neutral-700 opacity-20" />
					{children}
				</div>
			</body>
		</html>
	);
}
