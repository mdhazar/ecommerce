import type React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useVerifyToken } from "@/queries/auth";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Runs the startup token verification once, high in the tree, and syncs the
 * result into the auth store. Replaces the `dispatch(verifyToken())` that used
 * to run in App's mount effect.
 */
const AuthBootstrap: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const setUser = useAuthStore((state) => state.setUser);
	const logout = useAuthStore((state) => state.logout);
	const { data, isError } = useVerifyToken();

	useEffect(() => {
		if (data) setUser(data);
	}, [data, setUser]);

	useEffect(() => {
		if (isError) {
			logout();
			toast.error("Session expired. Please log in again.");
		}
	}, [isError, logout]);

	return <>{children}</>;
};

export default AuthBootstrap;
