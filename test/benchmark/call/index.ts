import { INestiaAgentProvider } from "@nestia/agent";
import { IConnection } from "@nestia/fetcher";
import { INestApplication } from "@nestjs/common";
import { NestContainer } from "@nestjs/core";
import { Module } from "@nestjs/core/injector/module";
import {
  HttpLlm,
  IHttpLlmApplication,
  OpenApiTypeChecker,
} from "@samchon/openapi";
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
  `${ConnectorConfiguration.ROOT}/bin/test/benchmark/call/scenarios`,
);
const SWAGGER_LOCATION = `${ConnectorConfiguration.ROOT}/packages/api/swagger.json`;

interface IOptions extends IFunctionCallBenchmarkOptions {
  swagger: boolean;
  semaphore: number;
  server: "local" | "dev";
}

interface IScenario extends IFunctionCallBenchmarkScenario {
  location: string;
}

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    command.option("--server <string>", "server address");
    command.option("--swagger <true|false>", "Build swagger document");
    command.option("--model <string>", "target model");
    command.option("--count <number>", "count of executions per scenario");
    command.option("--capacity <number>", "dividing count");
    command.option("--semaphore <number>", "semaphore size");
    command.option("--timeout <number>", "timeout for each execution");
    command.option("--include <string...>", "include feature files");
    command.option("--exclude <string...>", "exclude feature files");

    return action(async (options) => {
      // SERVER
      options.server ??= (await prompt.select("server")("Server address")([
        "dev",
        "local",
      ])) as "dev" | "local";

      // SWAGGER
      if (options.server === "local")
        if (fs.existsSync(SWAGGER_LOCATION) === false) options.swagger = true;
        else {
          if (typeof options.swagger === "string")
            options.swagger = options.swagger === "true";
          options.swagger ??= await prompt.boolean("swagger")(
            "Build swagger document",
          );
        }

      // TARGET MODEL
      options.model ??= (await prompt.select("model")("Select model")([
        "gpt-4o",
        "gpt-4o-mini",
      ])) as "gpt-4o" | "gpt-4o-mini";

      // COUNT
      if (typeof options.count === "string")
        options.count = Number(options.count);
      options.count ??= await prompt.number("count")(
        "Count of executions per scenario (default 10)",
        10,
      );

      // SEMAPHORE
      if (typeof options.semaphore === "string")
        options.semaphore = Number(options.semaphore);
      options.semaphore ??= await prompt.number("semaphore")(
        "Semaphore size (default 100)",
        100,
      );

      // CAPACITY
      if (typeof options.capacity === "string")
        options.capacity = Number(options.capacity);
      options.capacity ??= await prompt.number("capacity")(
        "Capacity count per agent (divide and conquer, default 100)",
        100,
      );

      // TIMEOUT
      if (typeof options.timeout === "string")
        options.timeout = Number(options.timeout);
      options.timeout ??= await prompt.number("timeout")(
        "Timeout for each execution (default 180s)",
        180,
      );

      return options as IOptions;
    });
  });

const getControllers = (app: INestApplication): Map<Function, Function> => {
  const container: NestContainer = (app as any).container as NestContainer;
  const modules: Module[] = [...container.getModules().values()].filter(
    (m) => !!m.controllers.size,
  );
  const dict: Map<Function, Function> = new Map();
  for (const m of modules)
    for (const controller of m.controllers.keys()) {
      if (typeof controller === "function") {
        for (const key of Object.getOwnPropertyNames(controller.prototype)) {
          if (typeof controller.prototype[key] === "function") {
            dict.set(controller.prototype[key], controller);
          }
        }
      }
    }
  return dict;
};

const collectScenarios = async (props: {
  application: IHttpLlmApplication<"chatgpt">;
  operations: Map<Function, Function>;
  options: IOptions;
  location: string;
}): Promise<IScenario[]> => {
  const collection: IScenario[] = [];
  for (const file of await fs.promises.readdir(props.location)) {
    const next: string = path.resolve(`${props.location}/${file}`);
    const stat: fs.Stats = await fs.promises.lstat(next);
    if (stat.isDirectory())
      collection.push(
        ...(await collectScenarios({
          application: props.application,
          operations: props.operations,
          options: props.options,
          location: next,
        })),
      );
    else if (file.endsWith(".js")) {
      const modulo = await import(next);
      for (const [key, value] of Object.entries(modulo)) {
        if (typeof value !== "function") continue;
        else if (
          !!props.options.include?.length &&
          props.options.include.every((o) => key.includes(o) === false)
        )
          continue;
        else if (
          !!props.options.exclude?.length &&
          props.options.exclude.some((o) => key.includes(o) === true)
        )
          continue;
        const scenario: IFunctionCallBenchmarkScenario = value();
        if (
          typia.is<IFunctionCallBenchmarkScenario>(scenario) &&
          isExistingFunction({
            application: props.application,
            operations: props.operations,
            expected: scenario.expected,
          })
        )
          collection.push({
            ...scenario,
            location: next
              .substring(
                SCENARIO_LOCATION.length + path.sep.length,
                next.length - 3,
              )
              .split(path.sep)
              .join("/"),
          });
      }
    }
  }
  return collection;
};

const isExistingFunction = (props: {
  application: IHttpLlmApplication<"chatgpt">;
  operations: Map<Function, Function>;
  expected: IFunctionCallBenchmarkExpected;
}): boolean => {
  if (props.expected.type === "standalone") {
    const target: Function = props.expected.function;
    return props.application.functions.some(
      (func) =>
        func.operation()["x-samchon-controller"] ===
          props.operations.get(target)?.name &&
        func.operation()["x-samchon-accessor"]?.at(-1) === target.name,
    );
  } else if (props.expected.type === "allOf")
    return props.expected.allOf.every((expected) =>
      isExistingFunction({
        ...props,
        expected,
      }),
    );
  else if (props.expected.type === "anyOf")
    return props.expected.anyOf.every((expected) =>
      isExistingFunction({
        ...props,
        expected,
      }),
    );
  else if (props.expected.type === "array")
    return props.expected.items.every((expected) =>
      isExistingFunction({
        ...props,
        expected,
      }),
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
  ConnectorGlobal.testing = true;

  // COMPOSE LLM APPLICATION SCHEMA
  const application: IHttpLlmApplication<"chatgpt"> = HttpLlm.application({
    model: "chatgpt",
    document: typia.json.assertParse<ISwagger>(
      options.server === "local"
        ? await fs.promises.readFile(SWAGGER_LOCATION, "utf8")
        : await fetch(
            "https://wrtnio.github.io/connectors/swagger/swagger.json",
          ).then((r) => r.text()),
    ),
    options: {
      reference: true,
      separate: (schema) =>
        OpenApiTypeChecker.isString(schema) &&
        schema["x-wrtn-secret-key"] !== undefined,
    },
  });
  application.functions = application.functions.filter(
    (f) => f.operation()["x-wrtn-experimental"] !== true,
  );

  // BACKEND SERVER
  const storage: FakeS3Server = await FakeS3Server.open();
  const backend: ConnectorBackend = new ConnectorBackend();
  await backend.open();

  // CLIENT ASSETS
  const operations: Map<Function, Function> = getControllers(
    backend["application_"]!,
  );
  const semaphore: Semaphore = new Semaphore(options.semaphore);
  const scenarios: IScenario[] = await collectScenarios({
    application,
    operations,
    options,
    location: SCENARIO_LOCATION,
  });
  const provider: INestiaAgentProvider = {
    type: "chatgpt",
    api: new OpenAI({
      apiKey: ConnectorGlobal.env.OPENAI_API_KEY,
    }),
    model: options.model,
  };
  const connection: IConnection = {
    host:
      options.server === "local"
        ? `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}`
        : "https://studio-connector-poc.dev.wrtn.club",
  };
  console.log("Number of scenarios: #" + scenarios.length.toLocaleString());

  if (options.server !== "local") {
    await storage.close();
    await backend.close();
  }

  // DO BENCHMARK
  if (scenarios.length === 0) console.log("No scenario exists");
  else {
    const results: IFunctionCallBenchmarkResult[] = await Promise.all(
      scenarios.map(async (s) => {
        const start: number = Date.now();
        const res: IFunctionCallBenchmarkResult =
          await FunctionCallBenchmarkExecutor.execute({
            provider: provider,
            application,
            operations,
            connection,
            options,
            semaphore,
            scenario: s,
            location: s.location,
          });
        const success: number = res.trials.filter((t) => t.execute).length;
        const ratio: number = success / res.trials.length;
        console.log(
          (success === 0
            ? chalk.redBright
            : ratio < 0.25
              ? chalk.hex("#ff6600")
              : ratio < 0.5
                ? chalk.yellowBright
                : ratio < 0.75
                  ? chalk.cyanBright
                  : chalk.greenBright)(s.title),
          "-",
          chalk.yellowBright(success.toLocaleString()),
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
  }

  // TERMINATE LOCAL SERVER
  if (options.server === "local") {
    await storage.close();
    await backend.close();
  }
};
main().catch((error) => {
  console.log(error);
  process.exit(-1);
});
