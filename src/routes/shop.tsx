import { createFileRoute } from "@tanstack/react-router";
import ShopPage from "@/pages/ShopPage";

export interface ShopSearch {
	category?: string;
	gender?: string;
}

export const Route = createFileRoute("/shop")({
	validateSearch: (search: Record<string, unknown>): ShopSearch => ({
		category: typeof search.category === "string" ? search.category : undefined,
		gender: typeof search.gender === "string" ? search.gender : undefined,
	}),
	component: ShopPage,
});
