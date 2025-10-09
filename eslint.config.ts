import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

const config = [
	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
		languageOptions: {
			globals: globals.browser,
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			"prettier/prettier": "error",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	prettierConfig,
] as const;

export default config;
