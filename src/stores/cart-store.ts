import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types/models";

interface CartState {
	cart: CartItem[];
	payment: Record<string, unknown>;
	address: unknown;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateCartItem: (productId: number, count: number) => void;
	toggleCartItem: (productId: number) => void;
	clearCart: () => void;
	setCart: (cart: CartItem[]) => void;
	setPayment: (payment: Record<string, unknown>) => void;
	setAddress: (address: unknown) => void;
}

// The `persist` middleware writes the cart to localStorage on every mutation,
// replacing the hand-rolled `localStorage.setItem("cart", ...)` calls that used
// to live in the old redux action creators.
export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			cart: [],
			payment: {},
			address: null,
			addToCart: (product) =>
				set((state) => {
					const existing = state.cart.find(
						(item) => item.product.id === product.id,
					);
					if (existing) {
						return {
							cart: state.cart.map((item) =>
								item.product.id === product.id
									? { ...item, count: item.count + 1 }
									: item,
							),
						};
					}
					return {
						cart: [...state.cart, { product, count: 1, checked: true }],
					};
				}),
			removeFromCart: (productId) =>
				set((state) => ({
					cart: state.cart.filter((item) => item.product.id !== productId),
				})),
			updateCartItem: (productId, count) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.product.id === productId ? { ...item, count } : item,
					),
				})),
			toggleCartItem: (productId) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.product.id === productId
							? { ...item, checked: !item.checked }
							: item,
					),
				})),
			clearCart: () => set({ cart: [] }),
			setCart: (cart) => set({ cart }),
			setPayment: (payment) => set({ payment }),
			setAddress: (address) => set({ address }),
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
			// Only the cart survives reloads (payment/address are per-checkout).
			partialize: (state) => ({ cart: state.cart }),
		},
	),
);
