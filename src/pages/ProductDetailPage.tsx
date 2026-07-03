import { Link, useParams } from "@tanstack/react-router";
import type React from "react";
import { Button } from "@/components/ui/common/Button";
import { Container, Section } from "@/components/ui/common/Layout";
import { PageLoader } from "@/components/ui/common/Spinner";
import ProductCardInfo from "@/components/ui/ProductDetailPage/ProductCardInfo";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import { ProductRail } from "@/components/ui/product/ProductGrid";
import ProductDetailPageContent from "@/layouts/ProductDetailPageContent";
import SiteLayout from "@/layouts/SiteLayout";
import { useProduct, useProducts } from "@/queries/products";

const ProductDetailPage: React.FC = () => {
	const { productId } = useParams({ from: "/product/$productId" });
	const { data: product, isLoading } = useProduct(productId);

	// The products API filters on the numeric category id.
	const categoryFilter =
		product?.category_id != null ? String(product.category_id) : undefined;

	const { data: relatedData, isLoading: relatedLoading } = useProducts({
		category: categoryFilter,
		limit: 4,
	});

	const related = (relatedData?.products ?? [])
		.filter((p) => p.id !== product?.id)
		.slice(0, 4);

	if (isLoading) {
		return (
			<SiteLayout>
				<PageLoader label="Loading product…" />
			</SiteLayout>
		);
	}

	if (!product) {
		return (
			<SiteLayout>
				<Section>
					<Container className="flex flex-col items-center gap-6 text-center">
						<div>
							<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
								Product not found
							</p>
							<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
								We couldn&rsquo;t find that piece
							</h1>
							<p className="mx-auto mt-4 max-w-md text-muted-foreground">
								It may have sold out or been moved. Explore the rest of the
								collection to find something you love.
							</p>
						</div>
						<Button asChild size="lg">
							<Link to="/shop">Back to shop</Link>
						</Button>
					</Container>
				</Section>
			</SiteLayout>
		);
	}

	return (
		<SiteLayout>
			<ProductDetailPageContent />
			<ProductCardInfo />
			{related.length > 0 ? (
				<Section>
					<Container>
						<ProductRail
							eyebrow="More to explore"
							title="You may also like"
							products={related}
							loading={relatedLoading}
						/>
					</Container>
				</Section>
			) : null}
			<ShopPageBrandIcons />
		</SiteLayout>
	);
};

export default ProductDetailPage;
