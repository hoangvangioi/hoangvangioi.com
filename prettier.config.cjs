/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | TailwindConfig } */
const config = {
    arrowParens: "always",
    printWidth: 120,
    singleQuote: true,
    jsxSingleQuote: false,
    semi: false,
    trailingComma: "all",
    tabWidth: 4,
    useTabs: true,
    plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
