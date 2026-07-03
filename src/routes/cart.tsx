import { createFileRoute } from "@tanstack/react-router";
import ShoppingCartPage from "@/components/ui/ProductDetailPage/ShoppingPageCartComponent";

export const Route = createFileRoute("/cart")({
	component: ShoppingCartPage,
});
