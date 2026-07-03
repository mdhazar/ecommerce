import { Link, useParams } from "@tanstack/react-router";
import { CheckCircle2, PackageX } from "lucide-react";
import type React from "react";
import { Button, Container, PageHeader, Section } from "@/components/ui/common";
import SiteLayout from "@/layouts/SiteLayout";
import { formatPrice } from "@/lib/format";
import { onImageError } from "@/lib/images";
import { useOrdersStore } from "@/stores/orders-store";

const OrderConfirmationPage: React.FC = () => {
	const { id } = useParams({ from: "/order-confirmation/$id" });
	const order = useOrdersStore((state) => state.getById(id));

	if (!order) {
		return (
			<SiteLayout>
				<Container>
					<Section>
						<div className="mx-auto flex max-w-md flex-col items-center text-center">
							<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<PackageX className="size-7" aria-hidden="true" />
							</span>
							<h2 className="text-2xl font-semibold tracking-tight">
								We couldn't find that order
							</h2>
							<p className="mt-3 text-muted-foreground">
								The order reference may have expired or been placed on another
								device. Your order history has everything we have on record.
							</p>
							<div className="mt-8 flex flex-wrap justify-center gap-3">
								<Button asChild>
									<Link to="/orders">View order history</Link>
								</Button>
								<Button asChild variant="outline">
									<Link to="/shop">Continue shopping</Link>
								</Button>
							</div>
						</div>
					</Section>
				</Container>
			</SiteLayout>
		);
	}

	const placedOn = new Date(order.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<SiteLayout>
			<Container>
				<Section>
					<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
						<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
							<CheckCircle2 className="size-8" aria-hidden="true" />
						</span>
						<PageHeader
							eyebrow="Order confirmed"
							title="Thank you for your order"
							description="A confirmation is on its way to your inbox. We'll let you know the moment it ships."
						/>
					</div>

					<div className="mx-auto mt-12 max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-xs md:p-8">
						<div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
							<div>
								<p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Order number
								</p>
								<p className="mt-1 font-medium text-foreground">{order.id}</p>
							</div>
							<div className="sm:text-right">
								<p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Placed on
								</p>
								<p className="mt-1 font-medium text-foreground">{placedOn}</p>
							</div>
							{order.shippingName ? (
								<div className="sm:text-right">
									<p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
										Shipping to
									</p>
									<p className="mt-1 font-medium text-foreground">
										{order.shippingName}
									</p>
								</div>
							) : null}
						</div>

						<div className="space-y-4 py-6">
							{order.items.map((item) => (
								<div
									key={item.productId}
									className="flex items-center justify-between gap-4"
								>
									<div className="flex min-w-0 items-center gap-3">
										{item.image ? (
											<img
												src={item.image}
												onError={onImageError}
												alt={item.name}
												className="size-14 shrink-0 rounded-md border border-border object-cover"
											/>
										) : null}
										<div className="min-w-0">
											<p className="truncate text-sm font-medium text-foreground">
												{item.name}
											</p>
											<p className="text-xs text-muted-foreground">
												Qty {item.count}
											</p>
										</div>
									</div>
									<p className="shrink-0 text-sm font-medium text-foreground">
										{formatPrice(item.price * item.count)}
									</p>
								</div>
							))}
						</div>

						<div className="space-y-3 border-t border-border pt-6 text-sm">
							<div className="flex justify-between text-muted-foreground">
								<span>Subtotal</span>
								<span className="text-foreground">
									{formatPrice(order.subtotal)}
								</span>
							</div>
							<div className="flex justify-between text-muted-foreground">
								<span>Shipping</span>
								<span className="text-foreground">
									{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
								</span>
							</div>
							{order.cardLast4 ? (
								<div className="flex justify-between text-muted-foreground">
									<span>Paid with</span>
									<span className="font-mono text-foreground">
										•••• {order.cardLast4}
									</span>
								</div>
							) : null}
							<div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
								<span>Total</span>
								<span>{formatPrice(order.total)}</span>
							</div>
						</div>
					</div>

					<div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
						<Button asChild>
							<Link to="/shop">Continue shopping</Link>
						</Button>
						<Button asChild variant="outline">
							<Link to="/orders">View order history</Link>
						</Button>
					</div>
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default OrderConfirmationPage;
