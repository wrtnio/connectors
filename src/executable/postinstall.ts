import { execSync } from "child_process";
import os from "os";

async function main(): Promise<void> {
  if (os.platform() === "darwin") {
    console.log("Installing sharp for MacOS");
    execSync("npm install sharp --no-save", { stdio: "inherit" });
  } else if (os.platform() === "linux") {
    console.log("Installing sharp for Linux");
    execSync("npm install sharp --no-save", { stdio: "inherit" });
  } else if (os.platform() === "win32") {
    console.log("Installing sharp for Windows"); // for samchon
    execSync("npm install sharp --no-save", { stdio: "inherit" });
  } else {
    console.log("Unsupported platform");
  }
}

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
