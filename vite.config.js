import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	root: "./src",
	publicDir: "../public",
	plugins: [react()],
	css: {
		devSourcemap: true
	},
	build: {
		outDir: path.resolve(process.cwd(), "dist"),
		sourcemap: true,
		emptyOutDir: false
	},
	resolve: {
		alias: {
			'@': path.resolve(process.cwd(), "./"),
			'@client': path.resolve(process.cwd(), "./src/client"),
			'@server': path.resolve(process.cwd(), "./src/server"),
			'@shared': path.resolve(process.cwd(), "./src/shared"),
			'@public': path.resolve(process.cwd(), "./public"),
			'@icons': path.resolve(process.cwd(), "./public/icons")
		}
	}
});
