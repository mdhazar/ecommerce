import type React from "react";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/models";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
	products: Product[];
	loading?: boolean;
	skeletonCount?: number;
	emptyMessage?: string;
	className?: string;
}

/** Responsive product grid with skeleton + empty states baked in. */
export function ProductGrid({
	products,
	loading = false,
	skeletonCount = 8,
	emptyMessage = "No products found.",
	className,
}: ProductGridProps) {
	const gridClass = cn(
		"grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4",
		className,
	);

	if (loading) {
		return (
			<div className={gridClass}>
				{Array.from({ length: skeletonCount }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length skeleton list, never reordered
					<div key={i} className="flex flex-col gap-3">
						<Skeleton className="aspect-[4/5] w-full rounded-lg" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/3" />
					</div>
				))}
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="flex min-h-[30vh] items-center justify-center rounded-lg border border-dashed border-border">
				<p className="text-sm text-muted-foreground">{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className={gridClass}>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

interface ProductRailProps {
	title: string;
	eyebrow?: string;
	action?: React.ReactNode;
	products: Product[];
	loading?: boolean;
}

/** A titled horizontal section of products for the home page. */
export function ProductRail({
	title,
	eyebrow,
	action,
	products,
	loading,
}: ProductRailProps) {
	return (
		<div>
			<div className="mb-8 flex items-end justify-between gap-4">
				<div>
					{eyebrow ? (
						<p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							{eyebrow}
						</p>
					) : null}
					<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
						{title}
					</h2>
				</div>
				{action}
			</div>
			<ProductGrid
				products={products}
				loading={loading}
				skeletonCount={4}
				className="lg:grid-cols-4"
			/>
		</div>
	);
}
