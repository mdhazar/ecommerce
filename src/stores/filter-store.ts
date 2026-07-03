import { create } from "zustand";

interface FilterState {
	/**
	 * Live text in the shop search box, kept here so the input stays controlled
	 * while a debounced effect mirrors it into the URL search params.
	 */
	search: string;
	setSearch: (search: string) => void;
	/**
	 * Bridge used by the standalone search page to hand a query off to the shop:
	 * it seeds `search`, which the shop filter then lifts into the URL on mount.
	 */
	setFilterParams: (params: { filter: string; sort?: string }) => void;
	reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	search: "",
	setSearch: (search) => set({ search }),
	setFilterParams: ({ filter }) => set({ search: filter }),
	reset: () => set({ search: "" }),
}));
