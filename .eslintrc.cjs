/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [ 'plugin:@typescript-eslint/recommended','plugin:prettier/recommended', "plugin:react/jsx-runtime"],
  ignorePatterns: ["node_modules/", "dist/", "ui/", ".turbo/", "public/"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "react/hooks/exhaustive-deps": "off",
  }
};