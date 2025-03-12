"use client";

import { Accordion } from "@/components/ui/accordion";
import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";

export default function Test() {
	return (
		<div>
			<Accordion.Root>
				{/* Projects */}
				<Accordion.Item value="projects">
					<Accordion.Trigger>
						<div className="text-sm">Projects</div>
					</Accordion.Trigger>
					<Accordion.Content key={"projects"} className="flex flex-wrapgap-2">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam,
						ullam accusantium. Aperiam exercitationem, earum similique dolor,
						consectetur ex saepe officia sunt fugit autem eligendi commodi
						consequatur alias provident dicta neque.
					</Accordion.Content>
				</Accordion.Item>

				{/* Courses */}
				<Accordion.Item value="courses">
					<Accordion.Trigger>
						<div className="text-sm">Courses</div>
					</Accordion.Trigger>
					<Accordion.Content className="flex flex-wrap gap-2">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
						voluptatum atque doloribus, ea, voluptate necessitatibus unde
						aliquid magni aut amet provident doloremque ex delectus ipsam iusto,
						sit nam tempore molestiae.
					</Accordion.Content>
				</Accordion.Item>

				{/* Courses */}
				<Accordion.Item value="courses2">
					<Accordion.Trigger>
						<div className="text-sm">Courses</div>
					</Accordion.Trigger>
					<Accordion.Content className="flex flex-wrap gap-2">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
						voluptatum atque doloribus, ea, voluptate necessitatibus unde
						aliquid magni aut amet provident doloremque ex delectus ipsam iusto,
						sit nam tempore molestiae.
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	);
}
