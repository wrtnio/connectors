module.exports = {
  overrides: [
    {
      files: ["*.mts", "*.cts", "*.ts"],
      options: {
        parser: "typescript",
      },
    },
  ],
  printWidth: 80,
  semi: true,
  tabWidth: 2,
  trailingComma: "all",
  importOrder: ["<THIRD_PARTY_MODULES>", "^@wrtn/connector-api(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["decorators-legacy", "typescript"],
};
