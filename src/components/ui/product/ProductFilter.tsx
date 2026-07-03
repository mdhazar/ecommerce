import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Input, Label, Select } from "@/components/ui/common";
import { cn } from "@/lib/utils";
import { useCategories } from "@/queries/categories";
import { useFilterStore } from "@/stores/filter-store";
import type { Category } from "@/types/models";

const GENDERS = [
	{ code: "k", label: "Women" },
	{ code: "e", label: "Men" },
] as const;

const SORT_OPTIONS = [
	{ value: "", label: "Featured" },
	{ value: "price:asc", label: "Price: low to high" },
	{ value: "price:desc", label: "Price: high to low" },
	{ value: "rating:desc", label: "Top rated" },
] as const;

/**
 * The shop `category` search value IS the numeric category id — that is what the
 * products API filters on (the "gender:name" code segment returns zero results).
 */
const categoryValue = (category: Category): string => String(category.id);

const ProductFilter: React.FC = () => {
	const search = useSearch({ from: "/shop" });
	const navigate = useNavigate({ from: "/shop" });
	const { data: categories = [] } = useCategories();

	const text = useFilterStore((state) => state.search);
	const setText = useFilterStore((state) => state.setSearch);
	const resetSearch = useFilterStore((state) => state.reset);
	const [ready, setReady] = useState(false);

	// On mount, reconcile the search box with the URL:
	//  - a shareable link with ?filter=… wins and seeds the box;
	//  - otherwise a query handed over by the search page (in the store) is
	//    lifted into the URL so it drives the grid.
	// Leaving the page clears the store so a stale query never re-appears.
	// biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount to hydrate from the URL
	useEffect(() => {
		if (search.filter !== undefined) {
			setText(search.filter);
		} else if (text.trim().length > 0) {
			navigate({
				search: (prev) => ({ ...prev, filter: text.trim(), page: undefined }),
			});
		}
		setReady(true);
		return () => resetSearch();
	}, []);

	// Debounce the search box into the URL (~350ms); resets pagination.
	useEffect(() => {
		if (!ready) return;
		const handle = setTimeout(() => {
			const next = text.trim();
			if ((search.filter ?? "") === next) return;
			navigate({
				search: (prev) => ({
					...prev,
					filter: next.length > 0 ? next : undefined,
					page: undefined,
				}),
			});
		}, 350);
		return () => clearTimeout(handle);
	}, [text, ready, search.filter, navigate]);

	const selectCategory = (category?: Category): void => {
		const gender =
			category && (category.gender === "k" || category.gender === "e")
				? category.gender
				: undefined;
		navigate({
			search: (prev) => ({
				...prev,
				gender,
				category: category ? categoryValue(category) : undefined,
				page: undefined,
			}),
		});
	};

	const handleSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const value = event.target.value;
		navigate({
			search: (prev) => ({
				...prev,
				sort: value.length > 0 ? value : undefined,
				page: undefined,
			}),
		});
	};

	const isActive = (category: Category): boolean =>
		search.category === categoryValue(category);

	const chipClass = (active: boolean): string =>
		cn(
			"rounded-full border px-4 py-1.5 text-sm transition-colors",
			active
				? "border-primary bg-primary text-primary-foreground"
				: "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
		);

	const allActive = !search.category;

	return (
		<div className="flex flex-col gap-6">
			{/* Category chips, grouped by department */}
			<div className="flex flex-col gap-3">
				<div className="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={() => selectCategory(undefined)}
						className={chipClass(allActive)}
					>
						All products
					</button>
				</div>
				{GENDERS.map((gender) => {
					const items = categories.filter((c) => c.gender === gender.code);
					if (items.length === 0) return null;
					return (
						<div
							key={gender.code}
							className="flex flex-wrap items-center gap-2"
						>
							<span className="mr-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								{gender.label}
							</span>
							{items.map((category) => (
								<button
									key={category.id}
									type="button"
									onClick={() => selectCategory(category)}
									className={chipClass(isActive(category))}
								>
									{category.title}
								</button>
							))}
						</div>
					);
				})}
			</div>

			{/* Search + sort controls */}
			<div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
				<div className="flex w-full max-w-sm flex-col gap-1.5">
					<Label htmlFor="shop-search">Search</Label>
					<div className="relative">
						<Search
							size={16}
							aria-hidden="true"
							className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							id="shop-search"
							type="search"
							placeholder="Search the collection"
							value={text}
							onChange={(event) => setText(event.target.value)}
							className="pl-10"
						/>
					</div>
				</div>

				<div className="flex w-full flex-col gap-1.5 sm:w-56">
					<Label htmlFor="shop-sort">Sort by</Label>
					<Select
						id="shop-sort"
						value={search.sort ?? ""}
						onChange={handleSort}
					>
						{SORT_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
