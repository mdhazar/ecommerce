import { useParams } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { Container, Section } from "@/components/ui/common/Layout";
import { cn } from "@/lib/utils";
import { useCategories } from "@/queries/categories";
import { useProduct } from "@/queries/products";

type TabId = "description" | "details" | "shipping";

const TABS: { id: TabId; label: string }[] = [
	{ id: "description", label: "Description" },
	{ id: "details", label: "Details" },
	{ id: "shipping", label: "Shipping & returns" },
];

const ProductCardInfo: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabId>("description");
	const { productId } = useParams({ from: "/product/$productId" });
	const { data: product } = useProduct(productId);
	const { data: categories } = useCategories();

	if (!product) {
		return null;
	}

	const category = categories?.find((c) => c.id === product.category_id);

	const details: { label: string; value: string }[] = [
		category ? { label: "Collection", value: category.title } : null,
		{ label: "Rating", value: `${product.rating.toFixed(1)} out of 5` },
		{ label: "Sold", value: `${product.sell_count} sold` },
		{
			label: "Availability",
			value: product.stock > 0 ? "In stock" : "Currently sold out",
		},
	].filter((row): row is { label: string; value: string } => row !== null);

	return (
		<Section className="border-t border-border py-12 md:py-16">
			<Container>
				<div
					className="flex flex-wrap gap-6 border-b border-border"
					role="tablist"
				>
					{TABS.map((tab) => (
						<button
							type="button"
							key={tab.id}
							role="tab"
							onClick={() => setActiveTab(tab.id)}
							aria-selected={activeTab === tab.id}
							className={cn(
								"-mb-px border-b-2 pb-3 font-sans text-sm font-medium uppercase tracking-[0.12em] transition-colors",
								activeTab === tab.id
									? "border-primary text-foreground"
									: "border-transparent text-muted-foreground hover:text-foreground",
							)}
						>
							{tab.label}
						</button>
					))}
				</div>

				<div className="mt-8 max-w-3xl">
					{activeTab === "description" ? (
						<div className="space-y-4">
							<h3 className="text-xl">About {product.name}</h3>
							<p className="leading-relaxed text-muted-foreground">
								{product.description}
							</p>
						</div>
					) : null}

					{activeTab === "details" ? (
						<dl className="divide-y divide-border">
							{details.map((row) => (
								<div
									key={row.label}
									className="flex items-center justify-between gap-6 py-3"
								>
									<dt className="font-sans text-sm uppercase tracking-[0.12em] text-muted-foreground">
										{row.label}
									</dt>
									<dd className="text-sm font-medium text-foreground">
										{row.value}
									</dd>
								</div>
							))}
						</dl>
					) : null}

					{activeTab === "shipping" ? (
						<div className="space-y-4 leading-relaxed text-muted-foreground">
							<p>
								Complimentary carbon-neutral shipping on every order over $75.
								Orders are carefully packed and dispatched within one to two
								business days, with delivery typically arriving in three to
								five.
							</p>
							<p>
								Not quite right? Return unworn pieces within 30 days for a full
								refund. We include a prepaid label with every order, so sending
								something back is simple and free.
							</p>
						</div>
					) : null}
				</div>
			</Container>
		</Section>
	);
};

export default ProductCardInfo;
