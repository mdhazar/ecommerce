/// <reference types="vitest/config" />
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Dedicated Vitest config kept separate from vite.config.ts so the app's
// framework plugins (TanStack Start / Nitro) don't run inside the test env.
// Component tests render in isolation; routing is exercised via a memory router.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		css: true,
		clearMocks: true,
	},
});
