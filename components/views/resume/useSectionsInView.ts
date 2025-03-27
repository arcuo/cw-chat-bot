"use client";
import { useSetAtom } from "jotai";
import { type UseInViewOptions, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { selectedElementEd } from "./elements";

export const sectionViewStore = {
	disabled: false,
};

export function useSectionsInView() {
	const setSelectedElementId = useSetAtom(selectedElementEd);

	const options: UseInViewOptions = {
		amount: 0.5,
	};

	// Refs
	const skillsRef = useRef<HTMLParagraphElement>(null);
	const projectsRef = useRef<HTMLParagraphElement>(null);
	const timelineRef = useRef<HTMLParagraphElement>(null);
	const featuresRef = useRef<HTMLParagraphElement>(null);

	const skillsInView = useInView(skillsRef, { ...options });
	const projectsInView = useInView(projectsRef, { ...options });
	const timelineInView = useInView(timelineRef, { ...options });
	const featuresInView = useInView(featuresRef, { ...options });

	useEffect(() => {
		skillsInView &&
			!sectionViewStore.disabled &&
			setSelectedElementId("skills");
	}, [skillsInView]);

	useEffect(() => {
		projectsInView &&
			!sectionViewStore.disabled &&
			setSelectedElementId("projects");
	}, [projectsInView]);

	useEffect(() => {
		timelineInView &&
			!sectionViewStore.disabled &&
			setSelectedElementId("timeline");
	}, [timelineInView]);

	useEffect(() => {
		featuresInView &&
			!sectionViewStore.disabled &&
			setSelectedElementId("features");
	}, [featuresInView]);

	return { skillsRef, projectsRef, timelineRef, featuresRef };
}
