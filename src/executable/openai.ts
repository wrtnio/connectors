import cp from "child_process";
import fs from "fs";
import typia from "typia";
import {
  IOpenAiDocument,
  ISwagger,
  OpenAiComposer,
  OpenAiTypeChecker,
} from "@wrtnio/openai-function-schema";

import { ConnectorConfiguration } from "../ConnectorConfiguration";
import { IMigrateDocument, OpenApi } from "@samchon/openapi";

const main = async (): Promise<void> => {
  const location: string = `${ConnectorConfiguration.ROOT}/packages/api`;
  if (false === fs.existsSync(`${location}/swagger.json`))
    cp.execSync("npx nestia swagger", { stdio: "inherit" });

  const swagger: ISwagger = typia.assert<ISwagger>(
    JSON.parse(await fs.promises.readFile(`${location}/swagger.json`, "utf-8")),
  );
  const migrate: IMigrateDocument = OpenApi.migrate(swagger);

  for (const keyword of [false, true]) {
    const openai: IOpenAiDocument = OpenAiComposer.document({
      swagger,
      migrate,
      options: {
        keyword,
        separate: (s) =>
          OpenAiTypeChecker.isString(s) &&
          (s["x-wrtn-secret-key"] !== undefined ||
            s.contentMediaType !== undefined),
      },
    });
    await fs.promises.writeFile(
      `${location}/openai-${keyword ? "keyword" : "positional"}.json`,
      JSON.stringify(openai, null, 2),
      "utf8",
    );
  }
  await fs.promises.writeFile(
    `${location}/migrate.json`,
    JSON.stringify(migrate),
    "utf8",
  );
  await fs.promises.writeFile(
    `${location}/version.json`,
    JSON.stringify({ version: swagger.info?.version }),
    "utf8",
  );
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
