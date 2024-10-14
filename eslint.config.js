import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser, 
    },
    plugins: {
      prettier: prettierPlugin, 
    },
    rules: {
      "prettier/prettier": "error", 
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended, 
  prettierConfig, 
];
