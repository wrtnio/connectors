import { IHttpLlmApplication } from "@samchon/openapi";
import crypto from "crypto";
import fs from "fs";

import { IFunctionSelectBenchmarkResult } from "./IFunctionSelectBenchmarkResult";
import { IFunctionSelectBenchmarkOptions } from "./IFunctionSelectBenchmarkOptions";
import { ConnectorConfiguration } from "../../../src/ConnectorConfiguration";
import { MathUtil } from "../../../src/utils/MathUtil";
import { IFunctionSelectBenchmarkEvent } from "./IFunctionSelectBenchmarkEvent";
import { ArrayUtil } from "@nestia/e2e";
import { ErrorUtil } from "../../../src/utils/ErrorUtil";

export namespace FunctionSelectBenchmarkReporter {
  export interface IProps {
    application: IHttpLlmApplication<"chatgpt">;
    options: IFunctionSelectBenchmarkOptions;
    results: IFunctionSelectBenchmarkResult[];
  }

  export const report = async (props: IProps): Promise<void> => {
    try {
      await fs.promises.rm(LOCATION, {
        recursive: true,
      });
    } catch {}
    await fs.promises.mkdir(LOCATION, {
      recursive: true,
    });
    await writeReadMe(props);
    for (const result of props.results)
      await ArrayUtil.asyncForEach(result.events)((event, index) =>
        writeEvent(result, event, index),
      );
  };

  const writeReadMe = async (props: IProps): Promise<void> => {
    const trial: number = props.results
      .map((r) => r.count)
      .reduce((a, b) => a + b, 0);
    const average: number =
      props.results
        .map((r) =>
          r.events
            .map((e) => e.completed_at.getTime() - e.started_at.getTime())
            .reduce((a, b) => a + b, 0),
        )
        .reduce((a, b) => a + b, 0) / trial;
    const summary: string = [
      "# LLM Function Selection Benchmark",
      "## Summary",
      `  - Arguments:`,
      `    - \`repeat\`: ${props.options.repeat}`,
      `    - \`include\`: ${(props.options.include ?? []).join(", ")}`,
      `    - \`exclude\`: ${(props.options.exclude ?? []).join(", ")}`,
      `  - Aggregation:`,
      `    - Keywords: ${props.results.length}`,
      `    - Trial: ${props.results.map((r) => r.count).reduce((a, b) => a + b, 0)}`,
      `    - Success: ${props.results.map((r) => r.success).reduce((a, b) => a + b, 0)}`,
      `    - Failure: ${props.results.map((r) => r.count - r.success).reduce((a, b) => a + b, 0)}`,
      `    - Average Time: ${MathUtil.round(average).toLocaleString()} ms`,
    ].join("\n");

    const table: string = [
      "## Result",
      " Method | Path | Count | Success | Time/Avg | Keyword ",
      ":-------|:-----|:------|--------:|---------:|--------:",
      ...props.results.map((result) =>
        [
          result.function.method,
          result.function.path,
          result.count,
          result.success,
          MathUtil.round(
            result.events
              .map(
                (event) =>
                  event.completed_at.getTime() - event.started_at.getTime(),
              )
              .reduce((prev, curr) => prev + curr, 0) / result.count,
          ).toLocaleString() + " ms",
          `[${result.keyword}](${getResultLocationOfRelative(result)})`,
        ].join(" | "),
      ),
    ].join("\n");
    await fs.promises.writeFile(
      `${LOCATION}/README.md`,
      [summary, table].join("\n\n"),
      "utf8",
    );
  };

  const getResultLocationOfRelative = (
    result: IFunctionSelectBenchmarkResult,
  ): string =>
    `${result.function.method}.${result.function.path
      .split("/")
      .filter((s) => !!s.length)
      .join(
        ".",
      )}.${crypto.createHash("sha256").update(result.keyword, "utf8").digest("hex")}`;

  const writeEvent = async (
    result: IFunctionSelectBenchmarkResult,
    event: IFunctionSelectBenchmarkEvent,
    index: number,
  ): Promise<void> => {
    const location: string = `${LOCATION}/${getResultLocationOfRelative(result)}`;
    try {
      await fs.promises.mkdir(location, {
        recursive: true,
      });
    } catch {}
    await fs.promises.writeFile(
      `${location}/${index}.${event.kind}.json`,
      JSON.stringify(
        {
          function: {
            method: result.function.method,
            path: result.function.path,
            name: result.function.name,
            description: result.function.description,
          },
          keyword: result.keyword,
          event: {
            kind: event.kind,
            started_at: event.started_at,
            completed_at: event.completed_at,
            elapsed: event.completed_at.getTime() - event.started_at.getTime(),
            completions: event.kind !== "error" ? event.completions : undefined,
            error:
              event.kind === "error"
                ? ErrorUtil.toJSON(event.error)
                : undefined,
          },
        },
        null,
        2,
      ),
      "utf8",
    );
  };

  const LOCATION = `${ConnectorConfiguration.ROOT}/docs/benchmarks/select`;
}
