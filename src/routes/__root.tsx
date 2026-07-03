/// <reference types="vite/client" />
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type React from "react";
import { ToastContainer } from "react-toastify";
import AuthBootstrap from "@/components/AuthBootstrap";
import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";
import { queryClient } from "@/lib/query-client";
// Side-effect CSS imports: Vite injects these in dev (HMR <style>) and extracts
// + links them in the production build — works in both, unlike the `?url` +
// head-links pattern which 500s under the dev server here.
import "../index.css";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
			{ title: "Ecommerce" },
		],
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					<AuthBootstrap>{children}</AuthBootstrap>
					<ToastContainer />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}
