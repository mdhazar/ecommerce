import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/common/Button";
import { onImageError, productImage } from "@/lib/images";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem } from "@/types/models";

interface CartDropdownProps {
	isOpen: boolean;
	onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
	const cart = useCartStore((state) => state.cart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const updateCartItem = useCartStore((state) => state.updateCartItem);

	if (!isOpen) return null;

	const handleQuantityChange = (productId: number, newCount: number): void => {
		if (newCount < 1) return;
		updateCartItem(productId, newCount);
	};

	const total = cart.reduce(
		(sum, item) => sum + item.product.price * item.count,
		0,
	);

	return (
		<div className="absolute right-0 top-full z-50 mt-3 w-[22rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-popover text-popover-foreground shadow-xl">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<h3 className="font-sans text-sm font-semibold">
					Cart ({cart.length})
				</h3>
				<button
					type="button"
					onClick={onClose}
					className="text-muted-foreground transition-colors hover:text-foreground"
					aria-label="Close cart"
				>
					<X size={18} />
				</button>
			</div>

			{cart.length === 0 ? (
				<div className="px-4 py-10 text-center text-sm text-muted-foreground">
					Your cart is empty.
				</div>
			) : (
				<>
					<div className="max-h-80 overflow-y-auto px-4">
						{cart.map((item: CartItem) => (
							<div
								key={item.product.id}
								className="flex items-center gap-3 border-b border-border py-3 last:border-0"
							>
								<img
									src={productImage(item.product.images)}
									onError={onImageError}
									alt={item.product.name}
									className="h-16 w-14 shrink-0 rounded object-cover"
								/>
								<div className="min-w-0 grow">
									<h4 className="truncate text-sm font-medium">
										{item.product.name}
									</h4>
									<div className="mt-0.5 text-sm text-muted-foreground">
										${(item.product.price * item.count).toFixed(2)}
									</div>
									<div className="mt-1.5 flex items-center gap-2">
										<button
											type="button"
											onClick={() =>
												handleQuantityChange(item.product.id, item.count - 1)
											}
											className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
											aria-label="Decrease quantity"
										>
											<Minus size={12} />
										</button>
										<span className="min-w-[1.5rem] text-center text-sm">
											{item.count}
										</span>
										<button
											type="button"
											onClick={() =>
												handleQuantityChange(item.product.id, item.count + 1)
											}
											className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
											aria-label="Increase quantity"
										>
											<Plus size={12} />
										</button>
									</div>
								</div>
								<button
									type="button"
									onClick={() => removeFromCart(item.product.id)}
									className="p-2 text-muted-foreground transition-colors hover:text-destructive"
									aria-label={`Remove ${item.product.name}`}
								>
									<Trash2 size={16} />
								</button>
							</div>
						))}
					</div>

					<div className="border-t border-border p-4">
						<div className="mb-3 flex justify-between text-sm">
							<span className="text-muted-foreground">Subtotal</span>
							<span className="font-semibold">${total.toFixed(2)}</span>
						</div>
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
								onClick={onClose}
							>
								Keep shopping
							</Button>
							<Button size="sm" className="flex-1" asChild>
								<Link to="/cart" onClick={onClose}>
									View cart
								</Link>
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CartDropdown;
