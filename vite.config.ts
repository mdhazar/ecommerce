import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tailwindcss(),
		// SPA mode: no per-request SSR. Start still prerenders an HTML shell and
		// gives us file-based type-safe routing + server functions on demand.
		tanstackStart({ srcDirectory: "src", spa: { enabled: true } }),
		react(),
		nitro(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
