import { create } from "zustand";
import { clearToken } from "@/lib/auth-token";
import type { User } from "@/types/models";

interface AuthState {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
}

// Holds the resolved user in memory. The token itself lives in `auth-token.ts`
// (localStorage), and is re-verified on startup by the `useVerifyToken` query.
export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	logout: () => {
		clearToken();
		set({ user: null });
	},
}));
