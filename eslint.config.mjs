import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const eslintConfig = [
	// Ignorar archivos y carpetas innecesarias
	{
		ignores: ["**/pnpm-lock.yaml", "**/node_modules/", "**/.next/", "**/eslint.config.mjs", "**/postcss.config.mjs"],
	},

	// Extensiones base de Next.js, TypeScript y Prettier
	...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),

	// Configuración de plugins y parsers
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort,
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",

			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
			},
		},

		rules: {
			// 💅 Prettier (format automático)
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					trailingComma: "es5",
					semi: true,
					useTabs: true,
					tabWidth: 4,
					arrowParens: "avoid",
					jsxSingleQuote: false,
					bracketSpacing: true,
					endOfLine: "lf",
					bracketSameLine: false,
					insertPragma: false,
					quoteProps: "as-needed",
					singleAttributePerLine: false,
					printWidth: 150,
				},
			],

			// 🦺 TypeScript (buenas prácticas y errores)
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "separate-type-imports" }],

			// ✅ Importación y orden
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",

			// ❌ Desactivar reglas conflictivas o innecesarias
			"import/no-extraneous-dependencies": "off",
			"no-param-reassign": "off",
			"consistent-return": "off",
			"no-empty-pattern": "off",
			"no-use-before-define": "off",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "off",
			"@typescript-eslint/no-use-before-define": "off",

			// 🚨 Detectar imports sin usar
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},

	// Configuración específica para TypeScript y JavaScript
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
];

export default eslintConfig;
