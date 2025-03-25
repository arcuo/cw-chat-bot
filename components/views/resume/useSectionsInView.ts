"use client";
import { useSetAtom } from "jotai";
import { type UseInViewOptions, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { selectedElementEd, elements } from "./resumeView";

export function useSectionsInView() {
	const setSelectedElementId = useSetAtom(selectedElementEd);

	const options: UseInViewOptions = {
		amount: 0.5,
	};

	// Refs
	const root = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLParagraphElement>(null);
	const projectsRef = useRef<HTMLParagraphElement>(null);
	const timelineRef = useRef<HTMLParagraphElement>(null);
	const featuresRef = useRef<HTMLParagraphElement>(null);

	const skillsInView = useInView(skillsRef, { root, ...options });
	const projectsInView = useInView(projectsRef, { root, ...options });
	const timelineInView = useInView(timelineRef, { root, ...options });
	const featuresInView = useInView(featuresRef, { root, ...options });

	useEffect(() => {
		skillsInView && setSelectedElementId(elements[0].id);
	}, [skillsInView]);

	useEffect(() => {
		projectsInView && setSelectedElementId(elements[1].id);
	}, [projectsInView]);

	useEffect(() => {
		timelineInView && setSelectedElementId(elements[2].id);
	}, [timelineInView]);

	useEffect(() => {
		featuresInView && setSelectedElementId(elements[3].id);
	}, [featuresInView]);

	return { root, skillsRef, projectsRef, timelineRef, featuresRef };
}
