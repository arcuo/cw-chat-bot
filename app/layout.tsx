import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";
import { Construction, Wrench } from "lucide-react";

const font = Roboto_Flex({ subsets: ["latin"], weight: ["100", "300"] });

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
					font.className,
					"flex h-full w-full flex-col gap-2 overflow-auto",
				)}
			>
				<Header />
				<main className="overflow-auto px-15 py-10 max-lg:px-5">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
