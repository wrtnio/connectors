import { DynamicExecutor } from "@nestia/e2e";
import chalk from "chalk";

import CApi from "@wrtn/connector-api";

import { ConnectorBackend } from "../src/ConnectorBackend";
import { ConnectorConfiguration } from "../src/ConnectorConfiguration";
import { ArgumentParser } from "./helpers/ArgumentParser";
import { OpenAIMock } from "./helpers/OpenAIMock";
import { FakeS3Server } from "./servers/FakeS3Server";

interface IOptions {
  include?: string[];
  exclude?: string[];
  mock_llm: boolean;
}

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    // command.option("--mode <string>", "target mode");
    // command.option("--reset <true|false>", "reset local DB or not");
    command.option("--include <string...>", "include feature files");
    command.option("--exclude <string...>", "exclude feature files");
    command.option("--mock_llm <boolean>", "mock LLM api for faster testing");

    prompt;

    return action(async (options) => {
      // if (typeof options.reset === "string")
      //     options.reset = options.reset === "true";
      // options.mode ??= await prompt.select("mode")("Select mode")([
      //     "LOCAL",
      //     "DEV",
      //     "REAL",
      // ]);
      // options.reset ??= await prompt.boolean("reset")("Reset local DB");
      options.mock_llm = options.mock_llm !== ("false" as any);
      if (!options.mock_llm) {
        console.log("Using actual OpenAI API for testing");
        console.log("-- beware OpenAI apis incur costs and may be slow");
      } else {
        console.log("Using mocked OpenAI API for testing");
        console.log(
          "-- run with real API at least once when before finalizing changes to LLM logic",
        );
      }
      return options as IOptions;
    });
  });

async function main(): Promise<void> {
  const options: IOptions = await getOptions();

  // BACKEND SERVER
  const storage: FakeS3Server = await FakeS3Server.open();
  const backend: ConnectorBackend = new ConnectorBackend();
  await backend.open(options.mock_llm ? { openAIMock: OpenAIMock() } : {});

  //----
  // CLINET CONNECTOR
  //----
  // DO TEST
  const connection: CApi.IConnection = {
    host: `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}`,
  };
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: "test",
    location: __dirname + "/inhouse",
    parameters: () => [
      {
        host: connection.host,
        encryption: connection.encryption,
      },
    ],
    filter: (func) =>
      (!options.include?.length ||
        (options.include ?? []).some((str) => func.includes(str))) &&
      (!options.exclude?.length ||
        (options.exclude ?? []).every((str) => !func.includes(str))),
    onComplete: (exec) => {
      const trace = (str: string) =>
        console.log(`  - ${chalk.green(exec.name)}: ${str}`);
      if (exec.error === null) {
        const elapsed: number =
          new Date(exec.completed_at).getTime() -
          new Date(exec.started_at).getTime();
        trace(`${chalk.yellow(elapsed.toLocaleString())} ms`);
      } else trace(chalk.red(exec.error.name));
    },
  });

  await storage.close();
  await backend.close();

  const failures: DynamicExecutor.IExecution[] = report.executions.filter(
    (exec) => exec.error !== null,
  );
  if (failures.length === 0) {
    console.log("Success");
    console.log("Elapsed time", report.time.toLocaleString(), `ms`);
  } else {
    for (const f of failures) console.log(f.error);
    process.exit(-1);
  }

  console.log(
    [
      `All: #${report.executions.length}`,
      `Success: #${report.executions.length - failures.length}`,
      `Failed: #${failures.length}`,
    ].join("\n"),
  );
}
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
