import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface PlacedOrderItem {
	productId: number;
	name: string;
	price: number;
	count: number;
	image?: string;
}

export interface PlacedOrder {
	id: string;
	createdAt: string; // ISO timestamp
	items: PlacedOrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
	shippingName?: string;
	cardLast4?: string;
}

interface OrdersState {
	orders: PlacedOrder[];
	/** Create + store an order locally (no POST /order endpoint exists). */
	placeOrder: (order: Omit<PlacedOrder, "id" | "createdAt">) => PlacedOrder;
	getById: (id: string) => PlacedOrder | undefined;
	clear: () => void;
}

function newId(): string {
	try {
		if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
			return `NG-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
		}
	} catch {
		/* fall through */
	}
	return `NG-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Locally-placed orders from checkout. The order-history page merges these with
 * any server orders (GET /order) so a just-completed checkout is visible.
 */
export const useOrdersStore = create<OrdersState>()(
	persist(
		(set, get) => ({
			orders: [],
			placeOrder: (order) => {
				const placed: PlacedOrder = {
					...order,
					id: newId(),
					createdAt: new Date().toISOString(),
				};
				set((state) => ({ orders: [placed, ...state.orders] }));
				return placed;
			},
			getById: (id) => get().orders.find((order) => order.id === id),
			clear: () => set({ orders: [] }),
		}),
		{
			name: "placed-orders",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
