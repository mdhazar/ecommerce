import { createFileRoute } from "@tanstack/react-router";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";

export const Route = createFileRoute("/order-confirmation/$id")({
	component: OrderConfirmationPage,
});
