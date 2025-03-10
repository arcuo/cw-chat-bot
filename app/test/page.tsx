import { Timeline } from "@/components/ui/timeline";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { Baby, BookUser, Brush, Computer, GraduationCap, NotebookPen, Users } from "lucide-react";

export default function Test() {
	return (
		<>
			<Timeline
				min={2014}
				max={2025}
				rows={[
					{
						heading: "Education",
						entries: {
							2015: {
								start: 2015,
								end: 2018,
								content: "Cognitive Science (Ba)",
								color: "rgb(90 110 250)",
								textColor: "#fff",
								icon: <BookUser size={15}/>,
							},
							2017: {
								start: 2017,
								end: 2020,
								content: "Computer Science (Ba)",
								color: "rgb(225 118 118)",
								textColor: "#000",
								icon: <Computer size={15}/>,
							},
							2023: {
								start: 2023,
								end: 2025,
								content: "Computer Science (Ma)",
								color: "rgb(225 118 218)",
								textColor: "#000",
								icon: <GraduationCap size={15}/>,
							},
						},
					},
					{
						heading: "Work",
						entries: {
							2017: {
								start: 2017,
								end: 2020,
								content: "Student Software Engineer",
								color: "#94b144",
								icon: <Baby size={15}/>,
							},
							2020: {
								start: 2020,
								end: 2021,
								content: "Frontend Developer",
								color: "#94b144",
								icon: <Brush size={15}/>,
							},
							2021: {
								start: 2021,
								end: 2023,
								content: "Frontend Tech Lead",
								color: "#94b144",
								icon: <Users size={15}/>,
							},
							2023: {
								start: 2023,
								end: 2025,
								content: "Senior Software Engineer (Part time)", 
								color: "#94b144",
								icon: <NotebookPen size={15}/>,
							},
						},
					},
				]}
			/>
		</>
	);
}
