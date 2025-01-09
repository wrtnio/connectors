import { INestiaChatPrompt, NestiaChatAgent } from "@nestia/agent";
import {
  ChatGptTypeChecker,
  HttpLlm,
  IChatGptSchema,
  IHttpLlmApplication,
  OpenApi,
  OpenApiTypeChecker,
  OpenApiV3,
  OpenApiV3_1,
  SwaggerV2,
} from "@samchon/openapi";
import "@wrtnio/schema";
import chalk from "chalk";
import fs from "fs";
import OpenAI from "openai";
import typia from "typia";

import { ConnectorConfiguration } from "../../src/ConnectorConfiguration";
import { ConnectorGlobal } from "../../src/ConnectorGlobal";
import { ConsoleScanner } from "../helpers/ConsoleScanner";

const trace = (...args: any[]): void => {
  console.log("----------------------------------------------");
  console.log(...args);
  console.log("----------------------------------------------");
};

const fillArgument = (
  $defs: Record<string, IChatGptSchema>,
  schema: IChatGptSchema,
): any => {
  trace("FILL ARGUMENT", JSON.stringify(schema, null, 2));
  if (OpenApiTypeChecker.isString(schema))
    if (schema.description?.includes("@contentMediaType") !== undefined)
      return "https://namu.wiki/w/%EB%A6%B4%ED%8C%8C";
    else if (schema["x-wrtn-secret-key"] === "google")
      return ConnectorGlobal.env.GOOGLE_TEST_SECRET;
    else if (schema["x-wrtn-secret-key"] === "notion")
      return ConnectorGlobal.env.NOTION_TEST_SECRET;
    else if (schema["x-wrtn-secret-key"] === "slack")
      return ConnectorGlobal.env.SLACK_TEST_SECRET;
    else if (schema["x-wrtn-secret-key"] === "github")
      return ConnectorGlobal.env.G_GITHUB_TEST_SECRET;
    else return "Hello word";
  else if (ChatGptTypeChecker.isNumber(schema)) return 123;
  else if (ChatGptTypeChecker.isBoolean(schema)) return true;
  else if (ChatGptTypeChecker.isArray(schema))
    return new Array(1).fill(0).map(() => fillArgument($defs, schema.items));
  else if (ChatGptTypeChecker.isObject(schema)) {
    const obj: any = {};
    for (const [key, value] of Object.entries(schema.properties ?? {}))
      obj[key] = fillArgument($defs, value);
    return obj;
  } else if (ChatGptTypeChecker.isReference(schema)) {
    const ref: IChatGptSchema | undefined =
      $defs[schema.$ref.split("/").pop()!];
    if (ref !== undefined) return fillArgument($defs, ref);
  }
  trace("INVALID SCHEMA", schema);
  throw new Error("Invalid schema");
};

const main = async (): Promise<void> => {
  // GET LLM APPLICATION SCHEMA
  console.log("THE ROOT DIRECTORY", ConnectorConfiguration.ROOT);

  const swagger:
    | SwaggerV2.IDocument
    | OpenApiV3.IDocument
    | OpenApiV3_1.IDocument = JSON.parse(
    await fs.readFileSync(
      `${ConnectorConfiguration.ROOT}/packages/api/swagger.json`,
      "utf8",
    ),
  );
  const document: OpenApi.IDocument = OpenApi.convert(typia.assert(swagger));
  const application: IHttpLlmApplication<"chatgpt"> = HttpLlm.application({
    model: "chatgpt",
    document,
    options: {
      separate: (schema: IChatGptSchema) =>
        ChatGptTypeChecker.isString(schema) &&
        (schema as OpenApi.IJsonSchema.IString)["x-wrtn-secret-key"] !==
          undefined,
    },
  });
  await fs.promises.writeFile(
    `${ConnectorConfiguration.ROOT}/packages/api/application.json`,
    JSON.stringify(application, null, 2),
    "utf8",
  );

  // COMPOSE CHAT AGENT
  const agent: NestiaChatAgent = new NestiaChatAgent({
    service: {
      api: new OpenAI({
        baseURL: ConnectorGlobal.env.OPENAI_API_KEY,
      }),
      model: "gpt-4o",
    },
    connection: {
      host: `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}`,
    },
    application,
  });
  agent.on("initialize", () => console.log(chalk.greenBright("Initialized")));
  agent.on("select", (e) =>
    console.log(chalk.cyanBright("selected"), e.function.name, e.reason),
  );
  agent.on("call", (e) =>
    console.log(chalk.blueBright("call"), e.function.name),
  );
  agent.on("complete", (e) =>
    console.log(
      chalk.greenBright("completed"),
      e.function.name,
      e.response.status,
    ),
  );
  agent.on("cancel", (e) =>
    console.log(chalk.redBright("canceled"), e.function.name, e.reason),
  );

  // START CONVERSATION
  while (true) {
    const content: string = await ConsoleScanner.read("Input: ");
    if (content === "exit") break;

    const histories: INestiaChatPrompt[] = await agent.conversate(content);
    for (const h of histories)
      if (h.kind === "text")
        trace(chalk.yellow("Text"), chalk.blueBright(h.role), "\n\n", h.text);
      else if (h.kind === "describe")
        trace(
          chalk.whiteBright("Describe"),
          chalk.blueBright("agent"),
          "\n\n",
          h.text,
        );
  }
};
main().catch((error) => {
  console.log(error);
  process.exit(-1);
});
