import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/common/Button";
import { useProducts } from "@/queries/products";
import { ProductGrid } from "./ProductGrid";

const PAGE_SIZE = 12;

const ShopProducts: React.FC = () => {
	const search = useSearch({ from: "/shop" });
	const navigate = useNavigate({ from: "/shop" });

	const page = search.page ?? 1;
	const offset = (page - 1) * PAGE_SIZE;

	const { data, isLoading, isError } = useProducts({
		limit: PAGE_SIZE,
		offset,
		category: search.category,
		sort: search.sort,
		filter: search.filter,
	});

	const products = data?.products ?? [];
	const total = data?.total ?? 0;

	const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
	const isFirstPage = page <= 1;
	// Fixed bug: disable "Next" once we've reached the last full page or when
	// there are no results at all — never let the user page past the data.
	const isLastPage = total === 0 || offset + PAGE_SIZE >= total;

	const rangeStart = total === 0 ? 0 : offset + 1;
	const rangeEnd = Math.min(offset + products.length, total);

	const goToPage = (next: number): void => {
		navigate({
			search: (prev) => ({ ...prev, page: next > 1 ? next : undefined }),
		});
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	if (isError) {
		return (
			<div className="flex min-h-[30vh] items-center justify-center rounded-lg border border-dashed border-border">
				<p className="text-sm text-destructive">
					We couldn&apos;t load the collection. Please try again.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<p className="text-sm text-muted-foreground" aria-live="polite">
				{isLoading
					? "Loading products…"
					: total === 0
						? "No products found"
						: `Showing ${rangeStart}–${rangeEnd} of ${total} products`}
			</p>

			<ProductGrid
				products={products}
				loading={isLoading}
				skeletonCount={PAGE_SIZE}
				emptyMessage="No products match your filters yet. Try clearing the search or picking another category."
			/>

			{total > 0 && pageCount > 1 && (
				<div className="flex items-center justify-center gap-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => goToPage(page - 1)}
						disabled={isFirstPage}
					>
						<ChevronLeft size={16} />
						Previous
					</Button>
					<span className="text-sm text-muted-foreground">
						Page {page} of {pageCount}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => goToPage(page + 1)}
						disabled={isLastPage}
					>
						Next
						<ChevronRight size={16} />
					</Button>
				</div>
			)}
		</div>
	);
};

export default ShopProducts;
