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

// Applied in <head> before first paint so a dark-mode preference never flashes
// the light theme. Reads the plain-string `theme` key that ThemeToggle writes;
// falls back to the OS preference when the user has not chosen.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;if(d){e.classList.add('dark');}e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
			{ name: "color-scheme", content: "light dark" },
			{
				name: "description",
				content:
					"North & Grove — considered clothing and homeware for a warmer everyday.",
			},
			{ title: "North & Grove" },
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
			},
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
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted theme bootstrap */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					<AuthBootstrap>{children}</AuthBootstrap>
					<ToastContainer
						position="bottom-right"
						autoClose={2500}
						hideProgressBar
						theme="colored"
					/>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}
