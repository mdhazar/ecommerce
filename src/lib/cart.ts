import type { CartItem } from "@/types/models";

/** Shipping policy — single source of truth shared by cart + checkout. */
export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_FLAT = 8;

const isSelected = (item: CartItem) => item.checked !== false;

export function cartSubtotal(cart: CartItem[]): number {
	return cart
		.filter(isSelected)
		.reduce((sum, item) => sum + item.product.price * item.count, 0);
}

export function cartItemCount(cart: CartItem[]): number {
	return cart.filter(isSelected).reduce((sum, item) => sum + item.count, 0);
}

export function shippingFor(subtotal: number): number {
	if (subtotal <= 0) return 0;
	return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export function cartTotals(cart: CartItem[]): {
	subtotal: number;
	shipping: number;
	total: number;
	freeShippingRemaining: number;
} {
	const subtotal = cartSubtotal(cart);
	const shipping = shippingFor(subtotal);
	return {
		subtotal,
		shipping,
		total: subtotal + shipping,
		freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
	};
}
