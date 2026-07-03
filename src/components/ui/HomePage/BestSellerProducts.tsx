import { Link } from "@tanstack/react-router";
import type React from "react";
import { Container, Section } from "@/components/ui/common";
import { ProductRail } from "@/components/ui/product/ProductGrid";
import { useProducts } from "@/queries/products";

const BestSellerProducts: React.FC = () => {
	const { data, isLoading } = useProducts({
		limit: 8,
		sort: "sell_count:desc",
	});

	return (
		<Section className="border-t border-border">
			<Container>
				<ProductRail
					title="Best sellers"
					eyebrow="Loved by our community"
					action={
						<Link
							to="/shop"
							search={{}}
							className="text-sm font-medium text-primary hover:underline"
						>
							View all
						</Link>
					}
					products={data?.products ?? []}
					loading={isLoading}
				/>
			</Container>
		</Section>
	);
};

export default BestSellerProducts;
