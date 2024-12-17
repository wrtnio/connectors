import fs from "fs";
import { IHttpLlmApplication } from "@samchon/openapi";
import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { ConnectorConfiguration } from "../../../src/ConnectorConfiguration";

export namespace FunctionSelectBenchmarkReporter {
  export interface IProps {
    application: IHttpLlmApplication<"chatgpt">;
    options: IFunctionSelectBenchmarkOptions;
    results: IFunctionSelectBenchmarkResult[];
  }

  export const report = async (props: IProps): Promise<void> => {
    await writeReadMe(props);
  };

  const writeReadMe = async (props: IProps): Promise<void> => {
    const table: string = [
      " Method | Path | Keyword | Count | Success | Time/Avg ",
      ":-------|:-----|:--------|------:|--------:|---------:",
      ...props.results.map((result) =>
        [
          result.function.method,
          result.function.path,
          result.keyword,
          result.count,
          result.success,
          round(
            result.events
              .map(
                (event) =>
                  event.completed_at.getTime() - event.started_at.getTime(),
              )
              .reduce((prev, curr) => prev + curr, 0) / result.count,
          ) + " ms",
        ].join(" | "),
      ),
    ].join("\n");
    try {
      await fs.promises.mkdir(
        `${ConnectorConfiguration.ROOT}/docs/benchmarks/select`,
        {
          recursive: true,
        },
      );
    } catch {}
    await fs.promises.writeFile(
      `${ConnectorConfiguration.ROOT}/docs/benchmarks/select/README.md`,
      table,
      "utf8",
    );
  };
}

const round = (value: number) => Math.floor(value * 100) / 100;
