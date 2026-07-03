import { useQueries, useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { Product } from "@/types/models";

export interface OrderProduct {
	product_id: number;
	count: number;
	detail?: string;
}

export interface Order {
	id: number;
	order_date: string;
	price: number;
	products: OrderProduct[];
}

export function useOrders() {
	return useQuery({
		queryKey: ["orders"],
		queryFn: async () => (await api.get<Order[]>("/order")).data,
	});
}

/**
 * Server order line items only carry a `product_id`, so hydrate the given ids to
 * full products (name + images) for display. Fetches run in parallel and share
 * the same ["product", id] cache used elsewhere. A missing/404 product simply
 * won't appear in the returned map, letting callers fall back gracefully.
 */
export function useOrderProducts(productIds: number[]) {
	const uniqueIds = Array.from(new Set(productIds));

	const results = useQueries({
		queries: uniqueIds.map((id) => ({
			queryKey: ["product", id],
			queryFn: async () => (await api.get<Product>(`/products/${id}`)).data,
			staleTime: 5 * 60 * 1000,
			retry: false,
		})),
	});

	const productsById = new Map<number, Product>();
	uniqueIds.forEach((id, index) => {
		const product = results[index]?.data;
		if (product) productsById.set(id, product);
	});

	return {
		productsById,
		isLoading: results.some((result) => result.isLoading),
	};
}
