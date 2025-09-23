import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	css: {
		devSourcemap: true
	},
	build: {
		sourcemap: true,
		emptyOutDir: false
	}
});
