import { Link } from "@tanstack/react-router";
import { ChevronDown, Package } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	Badge,
	Button,
	Card,
	Container,
	PageHeader,
	PageLoader,
	Section,
} from "@/components/ui/common";
import SiteLayout from "@/layouts/SiteLayout";
import { formatPrice } from "@/lib/format";
import { onImageError, PLACEHOLDER_IMAGE, productImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { type Order, useOrderProducts, useOrders } from "@/queries/orders";
import type { PlacedOrder } from "@/stores/orders-store";
import { useOrdersStore } from "@/stores/orders-store";
import type { Product } from "@/types/models";

interface NormalizedLine {
	key: string;
	name: string;
	count: number;
	image: string;
	price?: number;
}

interface NormalizedOrder {
	id: string;
	source: "server" | "local";
	dateISO: string;
	total: number;
	itemCount: number;
	lines: NormalizedLine[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

function formatOrderDate(iso: string): string {
	const parsed = new Date(iso);
	if (Number.isNaN(parsed.getTime())) return "Date unavailable";
	return dateFormatter.format(parsed);
}

function normalizeLocalOrder(order: PlacedOrder): NormalizedOrder {
	return {
		id: order.id,
		source: "local",
		dateISO: order.createdAt,
		total: order.total,
		itemCount: order.items.reduce((sum, item) => sum + item.count, 0),
		lines: order.items.map((item) => ({
			key: `${order.id}-${item.productId}`,
			name: item.name,
			count: item.count,
			image: item.image || PLACEHOLDER_IMAGE,
			price: item.price,
		})),
	};
}

function normalizeServerOrder(
	order: Order,
	productsById: Map<number, Product>,
): NormalizedOrder {
	return {
		id: `NG-${order.id}`,
		source: "server",
		dateISO: order.order_date,
		total: order.price,
		itemCount: order.products.reduce((sum, line) => sum + line.count, 0),
		lines: order.products.map((line) => {
			const product = productsById.get(line.product_id);
			return {
				key: `${order.id}-${line.product_id}`,
				name: product?.name ?? `Item #${line.product_id}`,
				count: line.count,
				image: product ? productImage(product.images) : PLACEHOLDER_IMAGE,
				price: product?.price,
			};
		}),
	};
}

function statusFor(source: NormalizedOrder["source"]) {
	return source === "local"
		? { label: "Processing", variant: "secondary" as const }
		: { label: "Delivered", variant: "success" as const };
}

function OrderCard({ order }: { order: NormalizedOrder }) {
	const [expanded, setExpanded] = useState(false);
	const status = statusFor(order.source);

	return (
		<Card className="overflow-hidden">
			<button
				type="button"
				aria-expanded={expanded}
				onClick={() => setExpanded((value) => !value)}
				className="flex w-full flex-col gap-4 p-5 text-left transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between md:p-6"
			>
				<div className="flex items-center gap-4">
					<span className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground sm:flex">
						<Package className="size-5" aria-hidden="true" />
					</span>
					<div>
						<div className="flex flex-wrap items-center gap-2">
							<p className="font-medium">Order {order.id}</p>
							<Badge variant={status.variant}>{status.label}</Badge>
						</div>
						<p className="mt-1 text-sm text-muted-foreground">
							{formatOrderDate(order.dateISO)} &middot; {order.itemCount}{" "}
							{order.itemCount === 1 ? "item" : "items"}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between gap-4 sm:justify-end">
					<span className="font-medium">{formatPrice(order.total)}</span>
					<ChevronDown
						className={cn(
							"size-5 text-muted-foreground transition-transform",
							expanded && "rotate-180",
						)}
						aria-hidden="true"
					/>
				</div>
			</button>

			{expanded ? (
				<div className="border-border border-t px-5 py-4 md:px-6">
					<ul className="divide-y divide-border">
						{order.lines.map((line) => (
							<li key={line.key} className="flex items-center gap-4 py-3">
								<img
									src={line.image}
									alt={line.name}
									onError={onImageError}
									className="size-14 shrink-0 rounded-md border border-border object-cover"
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium">{line.name}</p>
									<p className="text-sm text-muted-foreground">
										Qty {line.count}
									</p>
								</div>
								{line.price !== undefined ? (
									<span className="text-sm text-muted-foreground">
										{formatPrice(line.price * line.count)}
									</span>
								) : null}
							</li>
						))}
					</ul>
					<div className="mt-4 flex items-center justify-between border-border border-t pt-4">
						<span className="text-sm text-muted-foreground">Order total</span>
						<span className="font-medium">{formatPrice(order.total)}</span>
					</div>
				</div>
			) : null}
		</Card>
	);
}

const PreviousOrdersPage: React.FC = () => {
	const { data: serverOrders = [], isLoading } = useOrders();
	const localOrders = useOrdersStore((state) => state.orders);

	const productIds = serverOrders.flatMap((order) =>
		order.products.map((line) => line.product_id),
	);
	const { productsById } = useOrderProducts(productIds);

	const orders: NormalizedOrder[] = [
		...localOrders.map(normalizeLocalOrder),
		...serverOrders.map((order) => normalizeServerOrder(order, productsById)),
	].sort(
		(a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
	);

	return (
		<SiteLayout>
			<Container>
				<Section>
					<PageHeader
						eyebrow="Account"
						title="Order history"
						description="A record of everything you've ordered from North & Grove. Expand any order to see the pieces inside."
					/>

					{isLoading && localOrders.length === 0 ? (
						<div className="mt-16">
							<PageLoader />
						</div>
					) : orders.length === 0 ? (
						<div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
							<span className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<Package className="size-7" aria-hidden="true" />
							</span>
							<h2 className="text-2xl font-semibold tracking-tight">
								No orders yet
							</h2>
							<p className="mt-3 text-muted-foreground">
								When you place your first order it will appear here, ready to
								revisit any time.
							</p>
							<Button asChild className="mt-8">
								<Link to="/shop">Start shopping</Link>
							</Button>
						</div>
					) : (
						<div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
							{orders.map((order) => (
								<OrderCard key={`${order.source}-${order.id}`} order={order} />
							))}
						</div>
					)}
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default PreviousOrdersPage;
