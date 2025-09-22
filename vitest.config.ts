import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			reporter: ['text', 'json-summary', 'html'],
			thresholds: {
				statements: 70,
				branches: 70,
				functions: 70,
				lines: 70
			}
		}
	}
});
