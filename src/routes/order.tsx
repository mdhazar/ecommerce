import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/lib/auth-token";
import OrderPage from "@/pages/OrderPage";

export const Route = createFileRoute("/order")({
	beforeLoad: () => {
		if (!getToken()) {
			throw redirect({ to: "/login", search: { redirect: "/order" } });
		}
	},
	component: OrderPage,
});
