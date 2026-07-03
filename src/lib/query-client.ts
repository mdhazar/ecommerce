import { QueryClient } from "@tanstack/react-query";

// A single QueryClient created at module scope. Never recreate it inside a
// component — that would wipe the cache on every render.
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});
