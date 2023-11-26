/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["sznm/react", "plugin:react/jsx-runtime"],
  ignorePatterns: ["node_modules/", "dist/", "ui/", ".turbo/", "public/"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error"
  }

};