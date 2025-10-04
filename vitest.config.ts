import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/setupTests.ts",
		coverage: {
			enabled: true,
			reporter: ["text", "json-summary", "html"],
			thresholds: {
				statements: 70,
				branches: 70,
				functions: 70,
				lines: 70
			}
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(process.cwd(), "./"),
			"@client": path.resolve(process.cwd(), "./src/client"),
			"@server": path.resolve(process.cwd(), "./src/server"),
			"@shared": path.resolve(process.cwd(), "./src/shared"),
			"@public": path.resolve(process.cwd(), "./public"),
			"@icons": path.resolve(process.cwd(), "./public/icons")
		}
	}
});
