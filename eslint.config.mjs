import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// ✅ Ignorar archivos innecesarios
	{
		ignores: ["**/pnpm-lock.yaml", "**/node_modules/", "**/.next/", "**/eslint.config.mjs", "**/postcss.config.mjs"],
	},

	// ✅ Extensiones base de Next.js, TypeScript, React y Prettier (manejadas por `FlatCompat`)
	...compat.extends(
		"next/core-web-vitals",
		"next/typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:import/recommended",
		"plugin:promise/recommended",
		"prettier"
	),

	// ✅ Configuración de plugins y parsers
	{
		plugins: {
			react: react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
			import: importPlugin,
			promise: promise,
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
			// ✅ Prettier (solo formato, sin conflictos con ESLint)
			"prettier/prettier": "off",

			// ✅ TypeScript (buenas prácticas y errores)
			"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "separate-type-imports" }],

			// ✅ React (buenas prácticas y errores)
			"react/prop-types": "off",
			"react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }],
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react/react-in-jsx-scope": "off", // ✅ React 17+ ya no necesita importar `React`

			// ✅ Ordenación automática de imports y exports
			"simple-import-sort/imports": "error", // 👈 Ordena automáticamente las importaciones
			"simple-import-sort/exports": "error", // 👈 Ordena automáticamente las exportaciones

			// ✅ Promesas (buenas prácticas)
			"promise/always-return": "off",
			"promise/catch-or-return": "error",
			"promise/no-nesting": "warn",
			"promise/no-promise-in-callback": "warn",

			// ✅ Accesibilidad (mejora en atributos y semántica)
			"jsx-a11y/anchor-is-valid": [
				"error",
				{
					aspects: ["invalidHref", "preferButton"],
				},
			],

			// ✅ Detectar imports sin usar
			"unused-imports/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],

			// ✅ Desactivar reglas conflictivas o innecesarias
			"no-param-reassign": "error", // ✅ Mejor activarla para evitar mutaciones directas
			"consistent-return": "off", // ❌ TypeScript ya maneja esto
			"no-shadow": "off", // ❌ TypeScript ya maneja esto
			"@typescript-eslint/no-shadow": "off", // ❌ TypeScript ya maneja esto
			"@typescript-eslint/no-use-before-define": "off", // ❌ TypeScript ya maneja esto
			"import/no-extraneous-dependencies": "error", // ✅ Mejor activarla para evitar dependencias no declaradas
		},
	},

	// ✅ Configuración específica para TypeScript y JavaScript
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		rules: {
			"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
];

export default eslintConfig;
