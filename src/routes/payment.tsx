import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/lib/auth-token";
import PaymentPage from "@/pages/PaymentPage";

export const Route = createFileRoute("/payment")({
	beforeLoad: () => {
		if (!getToken()) {
			throw redirect({ to: "/login", search: { redirect: "/payment" } });
		}
	},
	component: PaymentPage,
});
