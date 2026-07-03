import { ShieldCheck, Truck, Undo2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/common";
import { cartTotals, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { onImageError, productImage } from "@/lib/images";
import { useCartStore } from "@/stores/cart-store";

interface OrderSummaryProps {
	onButtonClick?: () => void;
	buttonText?: string;
	buttonDisabled?: boolean;
	showSecurityBadges?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
	onButtonClick,
	buttonText,
	buttonDisabled = false,
	showSecurityBadges = true,
}) => {
	const cart = useCartStore((state) => state.cart);
	const items = cart.filter((item) => item.checked !== false);
	const { subtotal, shipping, total } = cartTotals(cart);

	return (
		<div className="sticky top-24 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-xs">
			<h2 className="text-xl font-semibold tracking-tight">Order summary</h2>

			<div className="mt-6 space-y-4">
				{items.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						Your cart is empty. Add a few pieces to continue.
					</p>
				) : (
					items.map((item) => (
						<div
							key={item.product.id}
							className="flex items-center justify-between gap-4"
						>
							<div className="flex min-w-0 items-center gap-3">
								<img
									src={productImage(item.product.images)}
									onError={onImageError}
									alt={item.product.name}
									className="size-14 shrink-0 rounded-md border border-border object-cover"
								/>
								<div className="min-w-0">
									<p className="truncate text-sm font-medium text-foreground">
										{item.product.name}
									</p>
									<p className="text-xs text-muted-foreground">
										Qty {item.count}
									</p>
								</div>
							</div>
							<p className="shrink-0 text-sm font-medium text-foreground">
								{formatPrice(item.product.price * item.count)}
							</p>
						</div>
					))
				)}
			</div>

			<div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
				<div className="flex justify-between text-muted-foreground">
					<span>Subtotal</span>
					<span className="text-foreground">{formatPrice(subtotal)}</span>
				</div>
				<div className="flex justify-between text-muted-foreground">
					<span>Shipping</span>
					<span className="text-foreground">
						{shipping === 0 ? "Free" : formatPrice(shipping)}
					</span>
				</div>
				<div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
					<span>Total</span>
					<span>{formatPrice(total)}</span>
				</div>
			</div>

			{buttonText ? (
				<Button
					type="button"
					size="lg"
					className="mt-6 w-full"
					onClick={onButtonClick}
					disabled={buttonDisabled}
				>
					{buttonText}
				</Button>
			) : null}

			{showSecurityBadges ? (
				<div className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<ShieldCheck className="size-4 text-success" aria-hidden="true" />
						<span>Secure, encrypted checkout</span>
					</div>
					<div className="flex items-center gap-2">
						<Truck className="size-4 text-success" aria-hidden="true" />
						<span>
							Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)} · flat{" "}
							{formatPrice(SHIPPING_FLAT)} otherwise
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Undo2 className="size-4 text-success" aria-hidden="true" />
						<span>30-day easy returns</span>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default OrderSummary;
