import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/common/Badge";
import { Button } from "@/components/ui/common/Button";
import { Rating } from "@/components/ui/common/Rating";
import { formatPrice } from "@/lib/format";
import { onImageError, PLACEHOLDER_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useCategories } from "@/queries/categories";
import { useProduct } from "@/queries/products";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

const ProductDetailPageContent: React.FC = () => {
	const { productId } = useParams({ from: "/product/$productId" });
	const { data: product } = useProduct(productId);
	const { data: categories } = useCategories();

	const addToCart = useCartStore((state) => state.addToCart);
	const updateCartItem = useCartStore((state) => state.updateCartItem);
	const toggleWishlist = useWishlistStore((state) => state.toggle);
	const inWishlist = useWishlistStore((state) =>
		state.items.some((item) => item.id === product?.id),
	);

	const [activeImage, setActiveImage] = useState<number>(0);
	const [quantity, setQuantity] = useState<number>(1);

	// Reset gallery + quantity when navigating between products (route stays mounted).
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally keyed on product id
	useEffect(() => {
		setActiveImage(0);
		setQuantity(1);
	}, [product?.id]);

	if (!product) {
		return null;
	}

	const images = product.images ?? [];
	const mainImage = images[activeImage]?.url ?? PLACEHOLDER_IMAGE;
	const outOfStock = product.stock <= 0;
	const lowStock = product.stock > 0 && product.stock <= 5;
	const category = categories?.find((c) => c.id === product.category_id);

	const handleAddToCart = (): void => {
		if (outOfStock) return;
		// addToCart seeds the line item; updateCartItem sets the chosen quantity.
		addToCart(product);
		updateCartItem(product.id, quantity);
		toast.success(
			quantity > 1
				? `Added ${quantity} × “${product.name}” to your cart`
				: `Added “${product.name}” to your cart`,
		);
	};

	const handleWishlist = (): void => {
		toggleWishlist(product);
		toast.info(
			inWishlist
				? `Removed “${product.name}” from your wishlist`
				: `Saved “${product.name}” to your wishlist`,
		);
	};

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
			<nav
				aria-label="Breadcrumb"
				className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
			>
				<Link to="/" className="transition-colors hover:text-primary">
					Home
				</Link>
				<ChevronRight size={14} aria-hidden="true" />
				<Link to="/shop" className="transition-colors hover:text-primary">
					Shop
				</Link>
				<ChevronRight size={14} aria-hidden="true" />
				<span className="line-clamp-1 text-foreground">{product.name}</span>
			</nav>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
				{/* Gallery */}
				<div className="flex flex-col gap-4">
					<div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
						<img
							src={mainImage}
							onError={onImageError}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					</div>
					{images.length > 1 ? (
						<div className="grid grid-cols-4 gap-3">
							{images.map((image, index) => (
								<button
									type="button"
									key={image.url}
									onClick={() => setActiveImage(index)}
									aria-label={`View image ${index + 1}`}
									aria-pressed={index === activeImage}
									className={cn(
										"aspect-square overflow-hidden rounded-md bg-muted ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
										index === activeImage
											? "ring-2 ring-primary"
											: "opacity-70 hover:opacity-100",
									)}
								>
									<img
										src={image.url}
										onError={onImageError}
										alt={`${product.name} view ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</button>
							))}
						</div>
					) : null}
				</div>

				{/* Details */}
				<div className="flex flex-col">
					{category ? (
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							{category.title}
						</p>
					) : null}

					<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
						{product.name}
					</h1>

					<div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
						<Rating value={product.rating} count={product.sell_count} />
						<span className="text-sm text-muted-foreground">
							{product.sell_count} sold
						</span>
					</div>

					<p className="mt-6 text-3xl font-semibold text-foreground">
						{formatPrice(product.price)}
					</p>

					<div className="mt-4 flex items-center gap-3">
						{outOfStock ? (
							<Badge variant="destructive">Sold out</Badge>
						) : (
							<Badge variant="success">In stock</Badge>
						)}
						{lowStock ? (
							<span className="text-sm text-muted-foreground">
								Only {product.stock} left
							</span>
						) : null}
					</div>

					<p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
						{product.description}
					</p>

					<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
						<div className="flex items-center gap-1 self-start rounded-md border border-border p-1">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-9 w-9"
								aria-label="Decrease quantity"
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								disabled={outOfStock || quantity <= 1}
							>
								<Minus size={16} />
							</Button>
							<span
								className="w-10 text-center text-sm font-medium tabular-nums"
								aria-live="polite"
							>
								{quantity}
							</span>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-9 w-9"
								aria-label="Increase quantity"
								onClick={() =>
									setQuantity((q) => Math.min(product.stock, q + 1))
								}
								disabled={outOfStock || quantity >= product.stock}
							>
								<Plus size={16} />
							</Button>
						</div>

						<Button
							type="button"
							size="lg"
							className="flex-1"
							onClick={handleAddToCart}
							disabled={outOfStock}
						>
							<ShoppingBag size={18} />
							{outOfStock ? "Sold out" : "Add to cart"}
						</Button>
					</div>

					<Button
						type="button"
						variant="outline"
						size="lg"
						className="mt-3"
						onClick={handleWishlist}
						aria-pressed={inWishlist}
					>
						<Heart
							size={18}
							className={cn(inWishlist && "fill-primary text-primary")}
						/>
						{inWishlist ? "Saved to wishlist" : "Add to wishlist"}
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailPageContent;
