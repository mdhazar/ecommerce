import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import type React from "react";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
	Section,
} from "@/components/ui/common";
import SiteLayout from "@/layouts/SiteLayout";
import { cartTotals, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { onImageError, productImage } from "@/lib/images";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem } from "@/types/models";

const ShoppingCartPage: React.FC = () => {
	const cart = useCartStore((state) => state.cart);
	const user = useAuthStore((state) => state.user);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const updateCartItem = useCartStore((state) => state.updateCartItem);
	const navigate = useNavigate();

	const { subtotal, shipping, total, freeShippingRemaining } = cartTotals(cart);
	const shippingUnlocked = subtotal > 0 && freeShippingRemaining === 0;
	const progress =
		subtotal > 0
			? Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
			: 0;

	const handleQuantityChange = (item: CartItem, change: number): void => {
		const newCount = item.count + change;
		if (newCount < 1) return;
		if (newCount > item.product.stock) {
			toast.error(`Only ${item.product.stock} left in stock.`);
			return;
		}
		updateCartItem(item.product.id, newCount);
	};

	const handleRemove = (item: CartItem): void => {
		removeFromCart(item.product.id);
		toast.info(`Removed ${item.product.name} from your bag.`);
	};

	const handleCheckout = (): void => {
		if (!user || !Object.keys(user).length) {
			navigate({ to: "/login", search: { redirect: "/order" } });
			return;
		}
		navigate({ to: "/order" });
	};

	if (cart.length === 0) {
		return (
			<SiteLayout>
				<Container>
					<Section>
						<div className="mx-auto flex max-w-md flex-col items-center text-center">
							<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<ShoppingBag className="size-7" aria-hidden="true" />
							</span>
							<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
								Your bag
							</p>
							<h1 className="text-3xl font-semibold tracking-tight">
								Your bag is empty
							</h1>
							<p className="mt-3 text-muted-foreground">
								Nothing here yet. Explore our latest arrivals and find something
								you'll love to come home to.
							</p>
							<Button asChild className="mt-8">
								<Link to="/shop">Start shopping</Link>
							</Button>
						</div>
					</Section>
				</Container>
			</SiteLayout>
		);
	}

	return (
		<SiteLayout>
			<Container>
				<Section>
					<header className="mb-10">
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							Your bag
						</p>
						<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
							Shopping cart
						</h1>
						<p className="mt-3 text-muted-foreground">
							{cart.length} {cart.length === 1 ? "piece" : "pieces"} ready for
							checkout.
						</p>
					</header>

					<div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
						{/* Line items */}
						<ul className="divide-y divide-border border-y border-border">
							{cart.map((item) => (
								<li key={item.product.id} className="flex gap-4 py-6 sm:gap-6">
									<Link
										to="/product/$productId"
										params={{ productId: String(item.product.id) }}
										className="shrink-0 overflow-hidden rounded-md border border-border bg-muted"
									>
										<img
											src={productImage(item.product.images)}
											onError={onImageError}
											alt={item.product.name}
											className="size-24 object-cover sm:size-28"
										/>
									</Link>

									<div className="flex min-w-0 flex-1 flex-col">
										<div className="flex items-start justify-between gap-3">
											<div className="min-w-0">
												<Link
													to="/product/$productId"
													params={{ productId: String(item.product.id) }}
													className="font-medium text-foreground transition-colors hover:text-primary"
												>
													{item.product.name}
												</Link>
												<p className="mt-1 text-sm text-muted-foreground">
													{formatPrice(item.product.price)} each
												</p>
											</div>
											<button
												type="button"
												onClick={() => handleRemove(item)}
												aria-label={`Remove ${item.product.name}`}
												className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
											>
												<Trash2 className="size-4" aria-hidden="true" />
											</button>
										</div>

										<div className="mt-auto flex items-end justify-between gap-3 pt-4">
											<div className="inline-flex items-center rounded-md border border-border">
												<button
													type="button"
													onClick={() => handleQuantityChange(item, -1)}
													disabled={item.count <= 1}
													aria-label="Decrease quantity"
													className="flex size-9 items-center justify-center rounded-l-md text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
												>
													<Minus className="size-4" aria-hidden="true" />
												</button>
												<span className="w-10 text-center text-sm font-medium tabular-nums">
													{item.count}
												</span>
												<button
													type="button"
													onClick={() => handleQuantityChange(item, 1)}
													disabled={item.count >= item.product.stock}
													aria-label="Increase quantity"
													className="flex size-9 items-center justify-center rounded-r-md text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
												>
													<Plus className="size-4" aria-hidden="true" />
												</button>
											</div>
											<p className="font-medium tabular-nums">
												{formatPrice(item.product.price * item.count)}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>

						{/* Order summary */}
						<aside className="lg:sticky lg:top-24 lg:self-start">
							<Card>
								<CardHeader>
									<CardTitle className="text-xl">Order summary</CardTitle>
								</CardHeader>
								<CardContent className="space-y-5">
									<div className="rounded-md bg-muted p-4">
										<p className="flex items-center gap-2 text-sm text-muted-foreground">
											<Truck
												className="size-4 text-primary"
												aria-hidden="true"
											/>
											{shippingUnlocked
												? "You've unlocked complimentary shipping."
												: `Add ${formatPrice(freeShippingRemaining)} for complimentary shipping.`}
										</p>
										<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
											<div
												className="h-full rounded-full bg-primary transition-all"
												style={{ width: `${progress}%` }}
											/>
										</div>
									</div>

									<dl className="space-y-3 text-sm">
										<div className="flex items-center justify-between">
											<dt className="text-muted-foreground">Subtotal</dt>
											<dd className="font-medium tabular-nums">
												{formatPrice(subtotal)}
											</dd>
										</div>
										<div className="flex items-center justify-between">
											<dt className="text-muted-foreground">Shipping</dt>
											<dd className="font-medium tabular-nums">
												{shipping === 0 ? (
													<span className="text-success">Free</span>
												) : (
													formatPrice(shipping)
												)}
											</dd>
										</div>
									</dl>

									<div className="flex items-center justify-between border-t border-border pt-4">
										<span className="text-base font-medium">Total</span>
										<span className="text-lg font-semibold tabular-nums">
											{formatPrice(total)}
										</span>
									</div>

									<Button size="lg" className="w-full" onClick={handleCheckout}>
										Proceed to checkout
									</Button>

									<Button asChild variant="link" className="w-full">
										<Link to="/shop">Continue shopping</Link>
									</Button>

									<p className="text-center text-xs text-muted-foreground">
										Complimentary shipping on orders over{" "}
										{formatPrice(FREE_SHIPPING_THRESHOLD)}. 30-day returns.
									</p>
								</CardContent>
							</Card>
						</aside>
					</div>
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default ShoppingCartPage;
