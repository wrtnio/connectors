import { IChatGptService } from "@nestia/agent";
import { IConnection } from "@nestia/fetcher";
import { HttpLlm, IHttpLlmApplication } from "@samchon/openapi";
import { ISwagger } from "@wrtnio/schema";
import chalk from "chalk";
import cp from "child_process";
import fs from "fs";
import OpenAI from "openai";
import path from "path";
import { Semaphore } from "tstl";
import typia from "typia";

import { ConnectorBackend } from "../../../src/ConnectorBackend";
import { ArgumentParser } from "../../helpers/ArgumentParser";
import { FakeS3Server } from "../../servers/FakeS3Server";
import { IFunctionCallBenchmarkOptions } from "./structures/IFunctionCallBenchmarkOptions";
import { ConnectorConfiguration } from "../../../src/ConnectorConfiguration";
import { IFunctionCallBenchmarkScenario } from "./structures/IFunctionCallBenchmarkScenario";
import { IFunctionCallBenchmarkExpected } from "./structures/IFunctionCallBenchmarkExpected";
import { ConnectorGlobal } from "../../../src/ConnectorGlobal";
import { FunctionCallBenchmarkExecutor } from "./executors/FunctionCallBenchmarkExecutor";
import { IFunctionCallBenchmarkResult } from "./structures/IFunctionCallBenchmarkResult";
import { FunctionCallBenchmarkReporter } from "./executors/FunctionCallBenchmarkReporter";

const SCENARIO_LOCATION = path.resolve(
  `${ConnectorConfiguration.ROOT}/test/benchmark/call/scenarios`,
);
const SWAGGER_LOCATION = `${ConnectorConfiguration.ROOT}/packages/api/swagger.json`;

interface IOptions extends IFunctionCallBenchmarkOptions {
  swagger: boolean;
  semaphore: number;
}

interface IScenario extends IFunctionCallBenchmarkScenario {
  location: string;
}

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    command.option("--swagger <true|false>", "Build swagger document");
    command.option("--model <string>", "target model");
    command.option("--count <number>", "count of executions per scenario");
    command.option("--capacity <number>", "dividing count");
    command.option("--semaphore <number>", "semaphore size");
    command.option("--retry <number>", "retry count yielding 'keep going'");
    command.option("--include <string...>", "include feature files");
    command.option("--exclude <string...>", "exclude feature files");

    return action(async (options) => {
      if (fs.existsSync(SWAGGER_LOCATION) === false) options.swagger = true;
      else {
        if (typeof options.swagger === "string")
          options.swagger = options.swagger === "true";
        options.swagger ??= await prompt.boolean("swagger")(
          "Build swagger document",
        );
      }
      options.model ??= (await prompt.select("model")("Select model")([
        "gpt-4o",
        "gpt-4o-mini",
      ])) as "gpt-4o" | "gpt-4o-mini";
      options.count ??= await prompt.number("count")(
        "Count of executions per scenario (default 10)",
        10,
      );
      options.capacity ??= await prompt.number("capacity")(
        "Capacity count per agent (divide and conquer, default 100)",
        100,
      );
      options.retry ??= await prompt.number("retry")(
        "Retry count yielding 'keep going' (default 3)",
        3,
      );
      options.timeout ??= await prompt.number("timeout")(
        "Timeout in seconds (default 180)",
        180,
      );
      options.timeout *= 1_000;
      return options as IOptions;
    });
  });

const collectScenarios = async (
  application: IHttpLlmApplication<"chatgpt">,
  options: IOptions,
  directory: string,
): Promise<IScenario[]> => {
  const collection: IScenario[] = [];
  for (const file of await fs.promises.readdir(directory)) {
    const location: string = `${directory}/${file}`;
    const stat: fs.Stats = await fs.promises.lstat(location);
    if (stat.isDirectory()) {
      collection.push(
        ...(await collectScenarios(application, options, location)),
      );
    } else if (file.endsWith(".js")) {
      const modulo = await import(location);
      for (const [key, value] of Object.entries(modulo)) {
        if (typeof value !== "function") continue;
        else if (
          !!options.include?.length &&
          options.include.every((o) => key.includes(o) === false)
        )
          continue;
        else if (
          !!options.exclude?.length &&
          options.exclude.some((o) => key.includes(o) === true)
        )
          continue;
        const scenario: IFunctionCallBenchmarkScenario = value();
        if (
          typia.is<IFunctionCallBenchmarkScenario>(scenario) &&
          isExistingFunction(application, scenario.expected)
        )
          collection.push({
            ...scenario,
            location: path.resolve(
              location.replace(SCENARIO_LOCATION + path.sep, ""),
            ),
          });
      }
    }
  }
  return collection;
};

const isExistingFunction = (
  application: IHttpLlmApplication<"chatgpt">,
  expected: IFunctionCallBenchmarkExpected,
): boolean => {
  if (expected.type === "standalone")
    return application.functions.some(
      (func) =>
        func.operation()["x-samchon-controller"] ===
          expected.function.prototype.constructor.name &&
        func.operation()["x-samchon-accessor"]?.at(-1) ===
          expected.function.name,
    );
  else if (expected.type === "allOf")
    return expected.allOf.every((expected) =>
      isExistingFunction(application, expected),
    );
  else if (expected.type === "anyOf")
    return expected.anyOf.every((expected) =>
      isExistingFunction(application, expected),
    );
  else if (expected.type === "array")
    return expected.items.every((expected) =>
      isExistingFunction(application, expected),
    );
  else return false;
};

const main = async (): Promise<void> => {
  // PREPARE OPTIONS
  const options: IOptions = await getOptions();
  if (options.swagger === true)
    cp.execSync("npm run build:swagger", {
      cwd: ConnectorConfiguration.ROOT,
      stdio: "inherit",
    });

  // COMPOSE LLM APPLICATION SCHEMA
  const application: IHttpLlmApplication<"chatgpt"> = HttpLlm.application({
    model: "chatgpt",
    document: typia.json.assertParse<ISwagger>(
      await fs.promises.readFile(SWAGGER_LOCATION, "utf8"),
    ),
  });
  application.functions = application.functions.filter(
    (f) => f.operation()["x-wrtn-experimental"] !== true,
  );

  // BACKEND SERVER
  const storage: FakeS3Server = await FakeS3Server.open();
  const backend: ConnectorBackend = new ConnectorBackend();
  await backend.open();

  // DO BENCHMARK
  const semaphore: Semaphore = new Semaphore(options.semaphore);
  const scenarios: IScenario[] = await collectScenarios(
    application,
    options,
    `${ConnectorConfiguration.ROOT}/test/benchmark/call/scenarios`,
  );
  const service: IChatGptService = {
    api: new OpenAI({
      apiKey: ConnectorGlobal.env.OPENAI_API_KEY,
    }),
    model: "gpt-4o",
  };
  const connection: IConnection = {
    host: `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}`,
  };

  const results: IFunctionCallBenchmarkResult[] = await Promise.all(
    scenarios.map(async (s) => {
      const start: number = Date.now();
      const res: IFunctionCallBenchmarkResult =
        await FunctionCallBenchmarkExecutor.execute({
          service,
          application,
          connection,
          options,
          semaphore,
          scenario: s,
          location: s.location,
        });
      console.log(
        chalk.greenBright(s.title),
        "-",
        chalk.yellowBright(
          res.trials.filter((t) => t.execute).length.toLocaleString(),
        ),
        "of",
        chalk.yellowBright(options.count.toLocaleString()),
        (Date.now() - start).toLocaleString(),
        "ms",
      );
      return res;
    }),
  );
  await FunctionCallBenchmarkReporter.execute({
    options,
    results,
  });

  // TERMINATE
  await storage.close();
  await backend.close();
};
main().catch((error) => {
  console.log(error);
  process.exit(-1);
});
