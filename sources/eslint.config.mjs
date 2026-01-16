import globals from "globals";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig(
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		ignores: ["node_modules", "dist", "lib", "eslint.config.mjs", "prettier.config.mjs"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.vitest,
			},
		},
	},
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	prettierRecommended,
	{
		rules: {
			"prettier/prettier": [
				"error",
				{},
				{
					usePrettierrc: true,
				},
			],
		},
	}
);
