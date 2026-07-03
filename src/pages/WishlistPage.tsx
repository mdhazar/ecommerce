import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type React from "react";
import { toast } from "react-toastify";
import { Button, Container, PageHeader, Section } from "@/components/ui/common";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import SiteLayout from "@/layouts/SiteLayout";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

const WishlistPage: React.FC = () => {
	const items = useWishlistStore((state) => state.items);
	const clear = useWishlistStore((state) => state.clear);
	const addToCart = useCartStore((state) => state.addToCart);

	const handleAddAll = () => {
		for (const product of items) {
			addToCart(product);
		}
		toast.success(
			items.length === 1
				? "Added your saved item to the cart"
				: `Added ${items.length} saved items to the cart`,
		);
	};

	const handleClear = () => {
		clear();
		toast.info("Wishlist cleared");
	};

	return (
		<SiteLayout>
			<Container>
				<Section>
					<PageHeader
						eyebrow="Saved"
						title="Your wishlist"
						description="The pieces you've been keeping an eye on, gathered in one place. Take your time — they'll be here when you're ready."
					/>

					{items.length > 0 ? (
						<>
							<div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center">
								<p className="text-sm text-muted-foreground">
									{items.length} {items.length === 1 ? "item" : "items"} saved
								</p>
								<div className="flex flex-wrap items-center justify-center gap-3">
									<Button onClick={handleAddAll}>Add all to cart</Button>
									<Button variant="outline" onClick={handleClear}>
										Clear all
									</Button>
								</div>
							</div>

							<div className="mt-12">
								<ProductGrid products={items} />
							</div>
						</>
					) : (
						<div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
							<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<Heart className="size-7" aria-hidden="true" />
							</span>
							<h2 className="text-2xl font-semibold tracking-tight">
								Nothing saved yet
							</h2>
							<p className="mt-3 text-muted-foreground">
								Tap the heart on any piece you love and it will wait for you
								right here.
							</p>
							<Button asChild className="mt-8">
								<Link to="/shop">Explore the collection</Link>
							</Button>
						</div>
					)}
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default WishlistPage;
