import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "@/types/models";
import { useCartStore } from "./cart-store";

const product = (id: number): Product => ({
	id,
	name: `Product ${id}`,
	description: "",
	price: 10,
	stock: 5,
	rating: 4,
	sell_count: 1,
	category_id: 1,
	images: [],
});

describe("cart-store", () => {
	beforeEach(() => {
		useCartStore.setState({ cart: [], payment: {}, address: null });
		localStorage.clear();
	});

	it("adds a new product with count 1 and checked", () => {
		useCartStore.getState().addToCart(product(1));
		const { cart } = useCartStore.getState();
		expect(cart).toHaveLength(1);
		expect(cart[0]).toMatchObject({ count: 1, checked: true });
		expect(cart[0].product.id).toBe(1);
	});

	it("increments count when the same product is added again", () => {
		const p = product(1);
		useCartStore.getState().addToCart(p);
		useCartStore.getState().addToCart(p);
		const { cart } = useCartStore.getState();
		expect(cart).toHaveLength(1);
		expect(cart[0].count).toBe(2);
	});

	it("removes a product by id", () => {
		useCartStore.getState().addToCart(product(1));
		useCartStore.getState().addToCart(product(2));
		useCartStore.getState().removeFromCart(1);
		const { cart } = useCartStore.getState();
		expect(cart).toHaveLength(1);
		expect(cart[0].product.id).toBe(2);
	});

	it("updates an item's count", () => {
		useCartStore.getState().addToCart(product(1));
		useCartStore.getState().updateCartItem(1, 4);
		expect(useCartStore.getState().cart[0].count).toBe(4);
	});

	it("toggles an item's checked flag", () => {
		useCartStore.getState().addToCart(product(1));
		useCartStore.getState().toggleCartItem(1);
		expect(useCartStore.getState().cart[0].checked).toBe(false);
	});

	it("clears the cart", () => {
		useCartStore.getState().addToCart(product(1));
		useCartStore.getState().clearCart();
		expect(useCartStore.getState().cart).toHaveLength(0);
	});

	it("persists the cart to localStorage", () => {
		useCartStore.getState().addToCart(product(1));
		const stored = JSON.parse(localStorage.getItem("cart") ?? "{}");
		expect(stored.state.cart).toHaveLength(1);
		expect(stored.state.cart[0].product.id).toBe(1);
	});
});
