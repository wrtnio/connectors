import fs from "fs";

if (
  fs.existsSync("packages/api/lib/structures") === false &&
  fs.existsSync("packages/api/lib/api") === true
)
  throw new Error("The SDK library must not import of the outside.");
