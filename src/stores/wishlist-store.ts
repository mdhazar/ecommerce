import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/models";

interface WishlistState {
	items: Product[];
	toggle: (product: Product) => void;
	add: (product: Product) => void;
	remove: (productId: number) => void;
	clear: () => void;
	has: (productId: number) => boolean;
}

/**
 * Client-side wishlist. The backend exposes no wishlist endpoint, so favourites
 * live in localStorage (mirrors the cart-store pattern). Survives reloads;
 * scoped to the device.
 */
export const useWishlistStore = create<WishlistState>()(
	persist(
		(set, get) => ({
			items: [],
			toggle: (product) =>
				set((state) =>
					state.items.some((item) => item.id === product.id)
						? { items: state.items.filter((item) => item.id !== product.id) }
						: { items: [...state.items, product] },
				),
			add: (product) =>
				set((state) =>
					state.items.some((item) => item.id === product.id)
						? state
						: { items: [...state.items, product] },
				),
			remove: (productId) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== productId),
				})),
			clear: () => set({ items: [] }),
			has: (productId) => get().items.some((item) => item.id === productId),
		}),
		{
			name: "wishlist",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
