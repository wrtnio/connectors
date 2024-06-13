const cp = require("child_process");
const fs = require("fs");

const main = () => {
  cp.execSync("npm run build:swagger", {
    stdio: "inherit",
    cwd: `${__dirname}/../..`,
  });
  fs.copyFileSync(
    `${__dirname}/../../packages/api/swagger.json`,
    `${__dirname}/../out/swagger/swagger.json`,
  );
};
main();
