import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/ui/Footer";
import { outfit } from "@/components/utils/fonts";

const font = outfit;

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
			<body className={cn(font.className, "h-full w-full")}>
				<div id="content" className="flex h-full w-full flex-col overflow-auto">
					<Header />
					{children}
					<Toaster />
					<Footer />
				</div>
			</body>
			<SpeedInsights />
			<Analytics />
		</html>
	);
}
