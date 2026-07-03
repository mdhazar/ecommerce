import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { Product } from "@/types/models";

export interface ProductQueryParams {
	limit?: number;
	offset?: number;
	category?: string;
	sort?: string;
	filter?: string;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
}

export function useProducts(params: ProductQueryParams) {
	return useQuery({
		queryKey: ["products", params],
		queryFn: async () =>
			(await api.get<ProductsResponse>("/products", { params })).data,
		// Keep showing the previous page while the next one loads.
		placeholderData: keepPreviousData,
	});
}

export function useProduct(productId: string | number | undefined) {
	return useQuery({
		queryKey: ["product", productId],
		queryFn: async () =>
			(await api.get<Product>(`/products/${productId}`)).data,
		enabled: productId !== undefined && productId !== "",
	});
}
