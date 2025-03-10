"use client";

import { useRef, type PropsWithChildren } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(
	() => import("@/components/3D/utils").then((mod) => mod.Scene),
	{
		ssr: false,
	},
);

export default function Layout({ children }: PropsWithChildren) {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			{children}
			<Scene
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					pointerEvents: "none",
				}}
				// eventSource={ref}
				// eventPrefix="client"
			/>
		</>
	);
}
