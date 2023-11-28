/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [ 'plugin:@typescript-eslint/recommended',
              'plugin:prettier/recommended',
              "plugin:react/jsx-runtime",
              "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["node_modules/", "dist/", "ui/", ".turbo/", "public/"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  }
};