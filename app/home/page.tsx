import { Home } from "@/components/views/home";
import { getBaseResumes } from "../resume/resumeAction";

export default async function HomePage() {
	const premadeResumes = await getBaseResumes();
	return <Home premadeResumes={premadeResumes} />;
}
