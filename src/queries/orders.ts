import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

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
