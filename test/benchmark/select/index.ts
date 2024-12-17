import cp from "child_process";
import fs from "fs";
import { ArgumentParser } from "../../helpers/ArgumentParser";
import { ConnectorConfiguration } from "../../../src/ConnectorConfiguration";
import typia from "typia";
import { ISwagger } from "@wrtnio/schema";
import { HttpLlm, IHttpLlmApplication } from "@samchon/openapi";
import { FunctionSelectBenchmarkExecutor } from "./FunctionSelectBenchmarkExecutor";
import { ArrayUtil } from "@nestia/e2e";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { FunctionSelectBenchmarkReporter } from "./FunctionSelectBenchmarkReporter";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";

interface IOptions extends IFunctionSelectBenchmarkOptions {
  swagger: boolean;
}

const SWAGGER_LOCATION = `${ConnectorConfiguration.ROOT}/packages/api/swagger.json`;

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    command.option("--swagger <true|false>", "Build swagger document");
    command.option("--repeat <number>", "repeat benchmark");
    command.option("--include <string...>", "include benchmrk endpoints");
    command.option("--exclude <string...>", "exclude benchmark endpoints");
    return action(async (options) => {
      if (fs.existsSync(SWAGGER_LOCATION) === false) options.swagger = true;
      else {
        if (typeof options.swagger === "string")
          options.swagger = options.swagger === "true";
        options.swagger ??= await prompt.boolean("swagger")(
          "Build swagger document",
        );
      }
      if (typeof options.repeat === "string")
        options.repeat = Number(options.repeat);
      options.repeat ??= await prompt.number("repeat")("Repeating count");
      return options as IOptions;
    });
  });

const main = async (): Promise<void> => {
  // PREPARE OPTIONS
  const options: IOptions = await getOptions();
  if (options.swagger === true)
    cp.execSync("npm run build:swagger", {
      cwd: ConnectorConfiguration.ROOT,
      stdio: "inherit",
    });

  // COMPOSE APPLICATION
  const application: IHttpLlmApplication<"chatgpt"> = HttpLlm.application({
    model: "chatgpt",
    document: typia.json.assertParse<ISwagger>(
      await fs.promises.readFile(SWAGGER_LOCATION, "utf8"),
    ),
  });
  application.functions = application.functions.filter(
    (f) =>
      f.operation()["x-wrtn-experimental"] !== true &&
      f.operation()["x-wrtn-function-select-benchmarks"] !== undefined &&
      (!options.include?.length ||
        options.include.some((str) => f.path.includes(str))) &&
      (!options.exclude?.length ||
        options.exclude.every((str) => f.path.includes(str) === false)),
  );

  // DO BENCHMARK
  const executor: FunctionSelectBenchmarkExecutor =
    new FunctionSelectBenchmarkExecutor(application, options.repeat);
  const results: IFunctionSelectBenchmarkResult[] = (
    await ArrayUtil.asyncMap(application.functions)((func) =>
      ArrayUtil.asyncMap(
        func.operation()["x-wrtn-function-select-benchmarks"]!,
      )((keyword) => executor.execute(func, keyword)),
    )
  ).flat();

  // REPORT IT
  await FunctionSelectBenchmarkReporter.report({
    application,
    options,
    results,
  });
};
main().catch((error) => {
  console.log(error);
  process.exit(-1);
});
