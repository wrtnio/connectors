import cp from "child_process";
import fs from "fs";
import { ConnectorConfiguration } from "../ConnectorConfiguration";
import path from "path";

const processDirectory = async (directory: string): Promise<void> => {
  const files = await fs.promises.readdir(directory);
  const configs = files.filter((el) => el.endsWith("nestia.config.ts"));

  for (const config of configs) {
    const relativePath = path.relative(ConnectorConfiguration.ROOT, directory);
    const script = `node --max-old-space-size=8000 node_modules/nestia/bin swagger --config ./${relativePath}/${config}`;
    console.log(script);
    cp.execSync(script, { stdio: "inherit" });
  }
};

const main = async (): Promise<void> => {
  const rootLocation = path.join(ConnectorConfiguration.ROOT, "nestia-configs");
  const tagsLocation = path.join(rootLocation, "tags");

  // Process root nestia-configs directory
  await processDirectory(rootLocation);

  // Process nestia-configs/tags directory if it exists
  if (fs.existsSync(tagsLocation)) {
    await processDirectory(tagsLocation);
  }
};

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
