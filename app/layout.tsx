import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
		<html lang="en">
			<body className={cn(font.className, "flex h-full w-full flex-col")}>
				<Header />
				{children}
				<Toaster />
			</body>
			<SpeedInsights />
			<Analytics />
		</html>
	);
}
