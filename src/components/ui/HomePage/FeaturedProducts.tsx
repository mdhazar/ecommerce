import { Link } from "@tanstack/react-router";
import type React from "react";
import { Container, Section } from "@/components/ui/common";
import { ProductRail } from "@/components/ui/product/ProductGrid";
import { useProducts } from "@/queries/products";

const FeaturedProducts: React.FC = () => {
	const { data, isLoading } = useProducts({ limit: 4, sort: "rating:desc" });

	return (
		<Section>
			<Container>
				<ProductRail
					title="New arrivals"
					eyebrow="Fresh this week"
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

export default FeaturedProducts;
