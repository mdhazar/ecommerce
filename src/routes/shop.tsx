import { createFileRoute } from "@tanstack/react-router";
import ShopPage from "@/pages/ShopPage";

export interface ShopSearch {
	gender?: "k" | "e";
	category?: string;
	filter?: string;
	sort?: string;
	page?: number;
}

const SORT_VALUES = new Set([
	"price:asc",
	"price:desc",
	"rating:desc",
	"sell_count:desc",
]);

export const Route = createFileRoute("/shop")({
	validateSearch: (search: Record<string, unknown>): ShopSearch => {
		const gender =
			search.gender === "k" || search.gender === "e"
				? search.gender
				: undefined;

		// Coerce to string: TanStack parses a bare `?category=1` as the number 1,
		// but the value we filter the API on is the (stringified) category id.
		const category =
			search.category != null && String(search.category).length > 0
				? String(search.category)
				: undefined;

		const filter =
			typeof search.filter === "string" && search.filter.length > 0
				? search.filter
				: undefined;

		const sort =
			typeof search.sort === "string" && SORT_VALUES.has(search.sort)
				? search.sort
				: undefined;

		const pageValue = Number(search.page);
		const page =
			Number.isFinite(pageValue) && pageValue > 1
				? Math.floor(pageValue)
				: undefined;

		return { gender, category, filter, sort, page };
	},
	component: ShopPage,
});
