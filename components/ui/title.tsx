"use client";
import { motion as m } from "motion/react";

export function Title() {
	return (
		<m.div
			className="text-[1.3rem]"
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
		>
			<span className="font-bold">Hugh Benjamin Zachariae</span> / Software
			Engineer
		</m.div>
	);
}
