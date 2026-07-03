import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/lib/auth-token";
import PreviousOrdersPage from "@/pages/PreviousOrdersPage";

export const Route = createFileRoute("/orders")({
	beforeLoad: () => {
		if (!getToken()) {
			throw redirect({ to: "/login", search: { redirect: "/orders" } });
		}
	},
	component: PreviousOrdersPage,
});
