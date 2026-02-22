import { globalIgnores } from "eslint/config";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress";
import pluginVitest from "@vitest/eslint-plugin";
import pluginOxlint from "eslint-plugin-oxlint";
import skipFormatting from "eslint-config-prettier/flat";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"]
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  ...pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,

  {
    ...pluginCypress.configs.recommended,
    files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"]
  },

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },

  ...pluginOxlint.buildFromOxlintConfigFile(".oxlintrc.json"),

  skipFormatting,

  ...pluginVueA11y.configs["flat/recommended"],

  {
    rules: {
      semi: ["error", "always"]
    }
  }
);
