import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { Rating } from "@/components/ui/common/Rating";
import { formatPrice } from "@/lib/format";
import { onImageError, productImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types/models";

/**
 * The single product tile used everywhere products are listed (shop grid, home
 * rails, wishlist, related). Image links to the detail page; wishlist + add-to-
 * cart are overlaid actions that are keyboard reachable and don't nest buttons
 * inside the link.
 */
export function ProductCard({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) {
	const addToCart = useCartStore((state) => state.addToCart);
	const toggleWishlist = useWishlistStore((state) => state.toggle);
	const inWishlist = useWishlistStore((state) =>
		state.items.some((item) => item.id === product.id),
	);
	const outOfStock = typeof product.stock === "number" && product.stock <= 0;

	const handleAdd = () => {
		addToCart(product);
		toast.success(`Added “${product.name}” to cart`);
	};

	const handleWishlist = () => {
		toggleWishlist(product);
		toast.info(
			inWishlist
				? `Removed “${product.name}” from wishlist`
				: `Saved “${product.name}” to wishlist`,
		);
	};

	return (
		<article className={cn("group flex flex-col", className)}>
			<div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
				<Link
					to="/product/$productId"
					params={{ productId: String(product.id) }}
					aria-label={product.name}
				>
					<img
						src={productImage(product.images)}
						onError={onImageError}
						alt={product.name}
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					/>
				</Link>

				<button
					type="button"
					onClick={handleWishlist}
					aria-pressed={inWishlist}
					aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
					className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
				>
					<Heart
						size={17}
						className={cn(inWishlist && "fill-primary text-primary")}
					/>
				</button>

				{outOfStock && (
					<span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-2.5 py-0.5 text-xs font-medium text-background">
						Sold out
					</span>
				)}

				{!outOfStock && (
					<div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
						<button
							type="button"
							onClick={handleAdd}
							className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
						>
							<ShoppingBag size={16} /> Add to cart
						</button>
					</div>
				)}
			</div>

			<div className="mt-3 flex flex-col gap-1">
				<Link
					to="/product/$productId"
					params={{ productId: String(product.id) }}
					className="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
				>
					{product.name}
				</Link>
				{typeof product.rating === "number" && product.rating > 0 ? (
					<Rating value={product.rating} size={13} />
				) : null}
				<p className="text-sm font-semibold text-foreground">
					{formatPrice(product.price)}
				</p>
			</div>
		</article>
	);
}

export default ProductCard;
