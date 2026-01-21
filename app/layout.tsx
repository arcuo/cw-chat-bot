import type { Metadata } from "next";
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
			<style precedence="scroll-marker-group" href="scroll-marker-group">
				{`.scroll-marker-group {
					scroll-marker-group: after;

					& > ::scroll-marker {
						content: " ";
						display: block;
						border-radius: 50%;
						width: 8px;
						height: 8px;
						opacity: 0.5;
						background-color: var(--color-scroll-color, var(--color-neutral-400));
						transition: opacity 0.3s, transform 0.3s;
					}
					
					& > ::scroll-marker:target-current {
						opacity: 1;
						transform: scale(1.2);
					}

					&::scroll-marker-group {
						display: flex;
						flex-direction: row;
						gap: calc(var(--spacing) * 2);
						justify-content: center;
						align-items: center;
					}
				}`}
			</style>
			<body className={cn(font.className, "h-full w-full")}>
				<div id="content" className="flex h-full w-full flex-col overflow-auto">
					<Header />
					{children}
					<Footer />
				</div>
				{/* <Toaster /> */}
			</body>
			<SpeedInsights />
			<Analytics />
		</html>
	);
}
