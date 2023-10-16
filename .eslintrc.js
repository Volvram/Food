module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": 1, // Means warning
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", "prettierrc.cjs"],
};
