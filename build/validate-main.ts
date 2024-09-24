import fs from "fs";

if (
  fs.existsSync("lib/controllers") === false &&
  fs.existsSync("lib/src") === true &&
  fs.existsSync("lib/test") === true
)
  throw new Error("The main program must not import of the test program.");
