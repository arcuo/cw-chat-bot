"use client";

import { Button } from "@/components/ui/button";
import { SlideShow } from "@/components/ui/SlideShow";
import { useState } from "react";

export default function Test() {
	const [index, setIndex] = useState(0);
	return (
		<div>
			<Button onClick={() => setIndex((prev) => (prev + 1) % 3)}>+</Button>
			<SlideShow index={index} direction="left">
				<div>1</div>
				<div>2</div>
				<div>3</div>
			</SlideShow>
		</div>
	);
}
