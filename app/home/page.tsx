import { Home } from "@/components/views/home";
import { getBaseResumes } from "../resume/resumeAction";

export default async function HomePage() {
	try {
		const premadeResumes = await getBaseResumes();
		return <Home premadeResumes={premadeResumes} />;
	} catch (e) {
		return <Home premadeResumes={[]} />;
	}
}
