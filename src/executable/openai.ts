import { OpenApi } from "@samchon/openapi";
import cp from "child_process";
import fs from "fs";
import typia from "typia";

import { ConnectorConfiguration } from "../ConnectorConfiguration";
import { IOpenAiDocument } from "../services/openai/IOpenAiDocument";
import { OpenAiConverter } from "../services/openai/OpenAiConverter";

const main = async (): Promise<void> => {
  const location: string = `${ConnectorConfiguration.ROOT}/packages/api`;
  if (false === fs.existsSync(`${location}/swagger.json`))
    cp.execSync("npx nestia swagger", { stdio: "inherit" });

  const document: OpenApi.IDocument = typia.assert<OpenApi.IDocument>(
    JSON.parse(await fs.promises.readFile(`${location}/swagger.json`, "utf-8")),
  );
  const converted: IOpenAiDocument = OpenAiConverter.convert(document);
  await fs.promises.writeFile(
    `${location}/openai.json`,
    JSON.stringify(converted, null, 2),
  );
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
