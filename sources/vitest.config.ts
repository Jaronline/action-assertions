import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: "v8",
			enabled: true,
			reporter: ["text", "lcov"],
			exclude: [
				"node_modules/**",
				"dist/**",
				"lib/**",
				"test/**",
				"vitest.config.ts",
				"eslint.config.mjs",
				"prettier.config.mjs",
				".yarn/**",
			],
		},
	},
	esbuild: {
		target: "es2021",
	},
});
