import { Link, useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { ShoppingBag } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, PageHeader, Section } from "@/components/ui/common";
import OrderSummary from "@/components/ui/PaymentPage/OrderSummary";
import PaymentPageContent from "@/components/ui/PaymentPage/PaymentPageContent";
import SiteLayout from "@/layouts/SiteLayout";
import { cartTotals } from "@/lib/cart";
import { productImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { type PlacedOrderItem, useOrdersStore } from "@/stores/orders-store";
import type { Card } from "@/types/card";
import type { Address } from "@/types/models";

interface StoredCheckoutAddress {
	shipping: Address;
	billing: Address;
}

const CheckoutSteps: React.FC<{ current: 1 | 2 | 3 }> = ({ current }) => {
	const steps = ["Address", "Payment", "Confirmation"];
	return (
		<ol className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-sm">
			{steps.map((label, index) => {
				const step = index + 1;
				const done = step < current;
				const active = step === current;
				return (
					<li key={label} className="flex items-center gap-2">
						<span
							className={cn(
								"flex size-7 items-center justify-center rounded-full border text-xs font-medium",
								active && "border-primary bg-primary text-primary-foreground",
								done && "border-primary bg-primary/10 text-primary",
								!active && !done && "border-border text-muted-foreground",
							)}
						>
							{step}
						</span>
						<span
							className={cn(
								"font-sans uppercase tracking-[0.15em]",
								active ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{label}
						</span>
						{step < steps.length ? (
							<span className="mx-1 hidden h-px w-8 bg-border sm:block" />
						) : null}
					</li>
				);
			})}
		</ol>
	);
};

const EmptyState: React.FC<{
	title: string;
	description: string;
	to: "/cart" | "/order";
	cta: string;
}> = ({ title, description, to, cta }) => (
	<SiteLayout>
		<Container>
			<Section>
				<div className="mx-auto flex max-w-md flex-col items-center text-center">
					<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
						<ShoppingBag className="size-7" aria-hidden="true" />
					</span>
					<h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
					<p className="mt-3 text-muted-foreground">{description}</p>
					<Button asChild className="mt-8">
						<Link to={to}>{cta}</Link>
					</Button>
				</div>
			</Section>
		</Container>
	</SiteLayout>
);

const PaymentPage: React.FC = () => {
	const navigate = useNavigate();
	const cart = useCartStore((state) => state.cart);
	const address = useCartStore(
		(state) => state.address,
	) as StoredCheckoutAddress | null;
	const setPayment = useCartStore((state) => state.setPayment);
	const clearCart = useCartStore((state) => state.clearCart);
	const placeOrder = useOrdersStore((state) => state.placeOrder);

	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [isPlacing, setIsPlacing] = useState(false);

	const items = cart.filter((item) => item.checked !== false);

	if (items.length === 0) {
		return (
			<EmptyState
				title="Your cart is empty"
				description="Add a few pieces you love, then head back to checkout."
				to="/cart"
				cta="Browse the collection"
			/>
		);
	}

	if (!address?.shipping) {
		return (
			<EmptyState
				title="One step back"
				description="We need a delivery address before payment. Let's set that up first."
				to="/order"
				cta="Choose an address"
			/>
		);
	}

	const handlePlaceOrder = () => {
		if (!selectedCard) {
			toast.error("Please select a card to pay with.");
			return;
		}
		setIsPlacing(true);

		const { subtotal, shipping, total } = cartTotals(cart);
		const orderItems: PlacedOrderItem[] = items.map((item) => ({
			productId: item.product.id,
			name: item.product.name,
			price: item.product.price,
			count: item.count,
			image: productImage(item.product.images),
		}));
		const cardLast4 = selectedCard.card_no.replace(/\s+/g, "").slice(-4);

		const placed = placeOrder({
			items: orderItems,
			subtotal,
			shipping,
			total,
			shippingName: `${address.shipping.name} ${address.shipping.surname}`,
			cardLast4,
		});

		setPayment({
			cardId: selectedCard.id,
			nameOnCard: selectedCard.name_on_card,
			cardLast4,
		});
		clearCart();

		try {
			confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
		} catch {
			/* confetti is best-effort */
		}
		toast.success("Order placed — thank you!");

		navigate({
			to: "/order-confirmation/$id",
			params: { id: placed.id },
		});
	};

	return (
		<SiteLayout>
			<Container>
				<Section>
					<PageHeader
						eyebrow="Checkout"
						title="How would you like to pay?"
						description="Your details are encrypted and never stored in plain text. Select a card to complete your order."
					/>
					<CheckoutSteps current={2} />

					<div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
						<PaymentPageContent
							selectedCard={selectedCard}
							onCardSelect={setSelectedCard}
						/>
						<div>
							<OrderSummary
								buttonText={isPlacing ? "Placing order…" : "Place order"}
								buttonDisabled={!selectedCard || isPlacing}
								onButtonClick={handlePlaceOrder}
							/>
						</div>
					</div>
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default PaymentPage;
