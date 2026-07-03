import { createFileRoute } from "@tanstack/react-router";
import SearchPage from "@/pages/SearchPage";

export const Route = createFileRoute("/search")({
	validateSearch: (search: Record<string, unknown>): { q?: string } => ({
		q:
			typeof search.q === "string" && search.q.length > 0
				? search.q
				: undefined,
	}),
	component: SearchPage,
});
