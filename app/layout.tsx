import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";

const font = Outfit({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
	title: { default: "Benjamin Zachariae", template: "%s - Benjamin Zachariae" },
	description: "Homepage",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="overflow-x-hidden">
			<body
				className={cn(
					font.className,
					"flex h-full w-full flex-col gap-2 overflow-auto overflow-x-hidden",
				)}
			>
				<Header />
				<main className="overflow-auto px-15 py-10 max-sm:overflow-x-hidden max-md:max-w-full max-lg:px-5">
					{children}
				</main>
				<Toaster />
			</body>
		</html>
	);
}
