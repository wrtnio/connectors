const pages = require("gh-pages");

const main = async () => {
  await import("./swagger.js");
  await pages.publish(__dirname, {
    branch: "gh-pages",
    dotfiles: true,
  });
  console.log("\nDeploy completed");
};
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
