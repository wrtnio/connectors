const cp = require("child_process");
const fs = require("fs");

const main = () => {
  cp.execSync("npm run build:swagger", {
    stdio: "inherit",
    cwd: `${__dirname}/../..`,
  });
  for (const name of ["swagger", "openai"])
    fs.copyFileSync(
      `${__dirname}/../../packages/api/${name}.json`,
      `${__dirname}/../out/swagger/${name}.json`,
    );
};
main();
