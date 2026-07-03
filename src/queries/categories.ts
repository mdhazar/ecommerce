import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { Category } from "@/types/models";

export const categoriesQueryKey = ["categories"] as const;

export function useCategories() {
	return useQuery({
		queryKey: categoriesQueryKey,
		queryFn: async () => (await api.get<Category[]>("/categories")).data,
		staleTime: Number.POSITIVE_INFINITY,
	});
}
