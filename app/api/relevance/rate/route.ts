import { projectAndSkillSimilarity } from "@/lib/data/similarity";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { query } = await req.json();

	const relevance = projectAndSkillSimilarity(query);

	return new Response(JSON.stringify(relevance), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
