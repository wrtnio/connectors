import { IMigrateDocument, OpenApi } from "@samchon/openapi";
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
  const migrated: IMigrateDocument = OpenApi.migrate(document);
  const openai: IOpenAiDocument = OpenAiConverter.convert(document, migrated);
  await fs.promises.writeFile(
    `${location}/openai.json`,
    JSON.stringify(openai),
    "utf8",
  );
  await fs.promises.writeFile(
    `${location}/migrate.json`,
    JSON.stringify(migrated),
    "utf8",
  );
  await fs.promises.writeFile(
    `${location}/version.json`,
    JSON.stringify({ version: document.info?.version }),
    "utf8",
  );
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
