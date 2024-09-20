import { HttpLlm, HttpMigration, OpenApi } from "@samchon/openapi";
import cp from "child_process";
import fs from "fs";
import typia from "typia";

import { ConnectorConfiguration } from "../ConnectorConfiguration";
import {
  IHttpOpenAiApplication,
  ISwaggerMigrateApplication,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

const main = async (): Promise<void> => {
  const location: string = `${ConnectorConfiguration.ROOT}/packages/api`;
  if (false === fs.existsSync(`${location}/swagger.json`))
    cp.execSync("npx nestia swagger", { stdio: "inherit" });

  const document: OpenApi.IDocument = typia.assert<OpenApi.IDocument>(
    JSON.parse(await fs.promises.readFile(`${location}/swagger.json`, "utf-8")),
  );
  const migrate: ISwaggerMigrateApplication =
    HttpMigration.application(document);

  for (const keyword of [false, true]) {
    const openai: IHttpOpenAiApplication = HttpLlm.application(document, {
      keyword,
      separate: (s) =>
        OpenAiTypeChecker.isString(s) &&
        (s["x-wrtn-secret-key"] !== undefined ||
          s.contentMediaType !== undefined),
    });

    if (openai.errors.length > 0) {
      console.log(JSON.stringify(openai.errors, null, 2));
      throw new Error("new openai function schema has errors");
    }

    await fs.promises.writeFile(
      `${location}/openai-${keyword ? "keyword" : "positional"}.json`,
      JSON.stringify(openai),
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
    JSON.stringify({ version: document.info?.version }),
    "utf8",
  );
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
