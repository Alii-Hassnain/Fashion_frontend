import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginReact.configs.flat.recommended, // Include React config first

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "warn",         // Warn on unused variables
      "react/prop-types": "off",       // Downgrade from error to warning
    },
    extends: ["js/recommended"],

  },
  {
    ignores: ["node_modules", "dist"],
  },
]);
