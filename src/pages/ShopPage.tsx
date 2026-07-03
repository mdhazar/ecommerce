import { Link } from "@tanstack/react-router";
import type React from "react";
import { Container, PageHeader, Section } from "@/components/ui/common";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import ProductFilter from "@/components/ui/product/ProductFilter";
import ShopProducts from "@/components/ui/product/ShopProducts";
import SiteLayout from "@/layouts/SiteLayout";

const ShopPage: React.FC = () => {
	return (
		<SiteLayout>
			<Container>
				<Section>
					<nav
						aria-label="Breadcrumb"
						className="mb-8 text-sm text-muted-foreground"
					>
						<ol className="flex items-center gap-2">
							<li>
								<Link
									to="/"
									className="transition-colors hover:text-foreground"
								>
									Home
								</Link>
							</li>
							<li aria-hidden="true">/</li>
							<li className="text-foreground">Shop</li>
						</ol>
					</nav>

					<PageHeader
						eyebrow="Shop"
						title="All products"
						description="Considered pieces in natural fibres and warm, muted tones — made in small batches to be lived in and loved for seasons to come."
					/>

					<div className="mt-12 flex flex-col gap-10">
						<ProductFilter />
						<ShopProducts />
					</div>
				</Section>
			</Container>

			<ShopPageBrandIcons />
		</SiteLayout>
	);
};

export default ShopPage;
