const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

/** Canonical money formatting used across cards, cart, and checkout. */
export function formatPrice(value: number): string {
	return priceFormatter.format(Number.isFinite(value) ? value : 0);
}
