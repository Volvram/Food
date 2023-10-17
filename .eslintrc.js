module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
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
  plugins: ["@typescript-eslint", "react", "prettier", "import"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": 1, // 1 - means warning; 2 - means error
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": [
          "react"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
      }
    ]
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", "prettierrc.cjs",],
};
