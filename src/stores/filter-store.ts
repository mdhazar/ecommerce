import { create } from "zustand";

interface FilterState {
	filter: string;
	sort: string;
	/** Total result count, published by the product list query. */
	total: number;
	setFilterParams: (params: { filter: string; sort: string }) => void;
	setTotal: (total: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	filter: "",
	sort: "",
	total: 0,
	setFilterParams: ({ filter, sort }) => set({ filter, sort }),
	setTotal: (total) => set({ total }),
}));
