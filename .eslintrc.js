module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["tailwindcss", "@typescript-eslint", "import"],
  extends: [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["tailwindcss"],
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      },
    ],
    "@next/next/no-img-element": "off",
  },
};
