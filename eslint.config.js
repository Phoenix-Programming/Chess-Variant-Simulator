import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: ["dist/**"]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn"
		}
	}
];
