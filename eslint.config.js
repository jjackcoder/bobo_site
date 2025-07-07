import eslintPluginAstro from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  // 1. TypeScript 推荐规则（@typescript-eslint）
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
  },

  // 2. Astro 推荐规则
  ...eslintPluginAstro.configs.recommended,

  // 3. 针对 .astro 文件的特殊设置
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  // 4. 通用全局配置（适用于 .ts/.js）
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": "error",
    },
  },

  // 5. 忽略不需要 lint 的文件/目录
  {
    ignores: [
      "dist/**",
      "public/pagefind/**",
      "**/*.d.ts",
      "**/*.cjs",
      "**/*.js",
    ],
  },
];
