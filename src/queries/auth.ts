import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { getToken, setToken } from "@/lib/auth-token";
import { gravatarUrl } from "@/lib/gravatar";
import { useAuthStore } from "@/stores/auth-store";
import type { LoginData, User } from "@/types/models";

/**
 * Verifies a persisted token on startup. Only runs when a token exists.
 * On success it refreshes the stored token and returns the resolved user;
 * `AuthBootstrap` syncs the result into the auth store.
 */
export function useVerifyToken() {
	return useQuery({
		queryKey: ["auth", "verify"],
		enabled: Boolean(getToken()),
		retry: false,
		staleTime: Number.POSITIVE_INFINITY,
		queryFn: async () => {
			const { data } = await api.get<User>("/verify");
			if (data.token) setToken(data.token);
			const user: User = { ...data, gravatarUrl: gravatarUrl(data.email) };
			return user;
		},
	});
}

export function useLogin() {
	const setUser = useAuthStore((state) => state.setUser);
	return useMutation({
		mutationFn: async (data: LoginData) => {
			const { data: userInfo } = await api.post<User>("/login", {
				email: data.email,
				password: data.password,
			});
			return {
				userInfo,
				rememberMe: Boolean(data.rememberMe),
				email: data.email,
			};
		},
		onSuccess: ({ userInfo, rememberMe, email }) => {
			const user: User = { ...userInfo, gravatarUrl: gravatarUrl(email) };
			setUser(user);
			if (userInfo.token) {
				setToken(userInfo.token, rememberMe);
			}
		},
	});
}
