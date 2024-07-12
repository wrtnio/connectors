import cp from "child_process";
import fs from "fs";
import { ConnectorConfiguration } from "../ConnectorConfiguration";

const main = async (): Promise<void> => {
  const location: string = ConnectorConfiguration.ROOT;
  const files = await fs.promises.readdir(`${location}/nestia-configs`);
  const configs = files.filter((el) => el.endsWith("nestia.config.ts"));

  for await (const config of configs) {
    const script = `node --max-old-space-size=8000 node_modules/nestia/bin swagger --config ./nestia-configs/${config}`;
    console.log(script);
    cp.execSync(script);
  }
};

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
