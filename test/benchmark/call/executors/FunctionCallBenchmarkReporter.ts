import fs from "fs";
import os from "os";
import path from "path";

import { ConnectorConfiguration } from "../../../../src/ConnectorConfiguration";
import { IFunctionCallBenchmarkResult } from "../structures/IFunctionCallBenchmarkResult";
import { IFunctionCallBenchmarkOptions } from "../structures/IFunctionCallBenchmarkOptions";
import { INestiaChatTokenUsage } from "@nestia/agent";
import { OpenAIPriceComputer } from "../../../helpers/OpenAIPriceComputer";
import { IFunctionCallBenchmarkScenario } from "../structures/IFunctionCallBenchmarkScenario";

export namespace FunctionCallBenchmarkReporter {
  export interface IProps {
    options: IFunctionCallBenchmarkOptions;
    results: IFunctionCallBenchmarkResult[];
  }

  export const execute = async (props: IProps): Promise<void> => {
    await prepare();

    const everything: IFunctionCallBenchmarkResult.ITrial[] = props.results
      .map((r) => r.trials)
      .flat();
    const usage: INestiaChatTokenUsage = aggregateUsages(
      everything.map((t) => t.usage),
    );
    const price: OpenAIPriceComputer.IOutput = OpenAIPriceComputer.get(usage);

    const content: string[] = [
      "# LLM Function Selection Benchmark",
      "## Summary",
      `  - Arguments:`,
      `    - \`count\`: ${props.options.count}`,
      `    - \`include\`: ${(props.options.include ?? []).join(", ")}`,
      `    - \`exclude\`: ${(props.options.exclude ?? []).join(", ")}`,
      `  - Aggregation:`,
      `    - Trial: ${everything.length}`,
      `    - Success: ${everything.filter((e) => e.execute).length}`,
      `    - Failure: ${everything.filter((e) => !e.execute).length}`,
      `    - Average Time: ${everything.map((e) => (e.completed_at.getTime() - e.started_at.getTime()) / everything.length).toLocaleString()} ms`,
      `  - Token Usage ($${price.total.toLocaleString()}):`,
      `    - Total: ${usage.total.toLocaleString()}`,
      `    - Prompt ($${price.prompt.toLocaleString()}):`,
      `      - Total: ${usage.prompt.total.toLocaleString()}`,
      `      - Audio: ${usage.prompt.audio.toLocaleString()}`,
      `      - Cached: ${usage.prompt.cached.toLocaleString()}`,
      `    - Completion ($${price.completion.toLocaleString()}):`,
      `      - Total: ${usage.completion.total.toLocaleString()}`,
      `      - Accepted Prediction: ${usage.completion.accepted_prediction.toLocaleString()}`,
      `      - Audio: ${usage.completion.audio.toLocaleString()}`,
      `      - Reasoning: ${usage.completion.reasoning.toLocaleString()}`,
      `      - Rejected Prediction: ${usage.completion.rejected_prediction.toLocaleString()}`,
      "",
      "## Scenarios",
      " title | status | success cost | failure cost ",
      "-------|-------:|-------------:|-------------:",
      ...props.results.map((r) => {
        return [
          `[${r.location}](./${r.location}/README.md)`,
          [
            ...new Array(r.trials.filter((t) => t.execute)).join("■"),
            ...new Array(r.trials.filter((t) => !t.execute)).join("□"),
          ].join(""),
          ...[true, false].map(
            (success) =>
              "$" +
              OpenAIPriceComputer.get(
                aggregateUsages(
                  r.trials
                    .filter((t) => t.execute === success)
                    .map((t) => t.usage),
                ),
              ).total.toLocaleString(),
          ),
        ].join(" | ");
      }),
    ];

    const index: string = path.resolve(`${LOCATION}/README.md`);
    console.log(`Report has been written to ${JSON.stringify(index)}`);
    await fs.promises.writeFile(index, content.join("\n"), "utf8");
  };

  const reportResult = async (
    result: IFunctionCallBenchmarkResult,
  ): Promise<void> => {
    const usage: INestiaChatTokenUsage = aggregateUsages(
      result.trials.map((t) => t.usage),
    );
    const price: OpenAIPriceComputer.IOutput = OpenAIPriceComputer.get(usage);
    const content: string[] = [
      `# ${result.scenario.title}`,
      `## Prompt`,
      result.scenario.prompt,
      ``,
      `## Summary`,
      `  - Success: ${result.trials.filter((t) => t.execute).length}`,
      `  - Failure: ${result.trials.filter((t) => !t.execute).length}`,
      `  - Success Cost: $${price.total.toLocaleString()}`,
      `  - Failure Cost: $${price.total.toLocaleString()}`,
      `  - Average Time: ${
        result.trials
          .map((t) => t.completed_at.getTime() - t.started_at.getTime())
          .reduce((a, b) => a + b, 0) / result.trials.length
      } ms`,
      "",
      `## Trials`,
      " index | status | cost | file ",
      "-------|-------:|-----:|------",
      ...result.trials.map((t, i) => {
        return [
          (i + 1).toLocaleString(),
          t.execute ? "success" : "failure",
          "$" + OpenAIPriceComputer.get(t.usage).total.toLocaleString(),
          `[./${i + 1}.json](./${i + 1}.json)`,
        ].join(" | ");
      }),
    ];
    await Promise.all(
      result.trials.map((t, i) =>
        reportTrial(
          `${LOCATION}/${result.location}/${i + 1}.${t.execute ? "success" : "failure"}.md`,
          result.scenario,
          t,
        ),
      ),
    );
    await fs.promises.writeFile(
      path.resolve(`${LOCATION}/${result.location}/README.md`),
      content.join("\n"),
      "utf8",
    );
  };

  const reportTrial = async (
    location: string,
    scenario: IFunctionCallBenchmarkScenario,
    trial: IFunctionCallBenchmarkResult.ITrial,
  ): Promise<void> => {
    const price = OpenAIPriceComputer.get(trial.usage);
    const content: string[] = [
      `# ${scenario.title}`,
      `## Prompt`,
      scenario.prompt,
      ``,
      `## Summary`,
      `  - Status: ${trial.execute ? "success" : "failure"}`,
      `  - Token Usage: $${price.total.toLocaleString()}`,
      `    - Prompt: $${price.prompt.toLocaleString()}`,
      `      - Total: ${trial.usage.prompt.total.toLocaleString()}`,
      `      - Audio: ${trial.usage.prompt.audio.toLocaleString()}`,
      `      - Cached: ${trial.usage.prompt.cached.toLocaleString()}`,
      `    - Completion: $${price.completion.toLocaleString()}`,
      `      - Total: ${trial.usage.completion.total.toLocaleString()}`,
      `      - Accepted Prediction: ${trial.usage.completion.accepted_prediction.toLocaleString()}`,
      `      - Audio: ${trial.usage.completion.audio.toLocaleString()}`,
      `      - Reasoning: ${trial.usage.completion.reasoning.toLocaleString()}`,
      `      - Rejected Prediction: ${trial.usage.completion.rejected_prediction.toLocaleString()}`,
      `  - Time: ${(trial.completed_at.getTime() - trial.started_at.getTime()).toLocaleString()} ms`,
      ``,
      `## History`,
      ...trial.histories
        .map((h) => {
          if (h.kind === "text") return [`### Text (${h.role})`, h.text, ""];
          else if (h.kind === "describe") return [`### Describe`, h.text, ""];
          else if (h.kind === "execute")
            return [
              `### Execute`,
              `  - endpoint: ${h.function.method} ${h.function.path}`,
              `  - description: ${h.function.description}`,
              `  - status: ${h.response.status}`,
              ``,
              "#### Arguments",
              "```json",
              JSON.stringify(h.arguments, null, 2),
              "```",
              "",
              "#### Response",
              "```json",
              JSON.stringify(h.response, null, 2),
              "```",
              "",
            ];
          else if (h.kind === "select")
            return [
              `### Select`,
              ...h.functions.map(
                (f) =>
                  `  - ${f.function.method} ${f.function.path}: ${f.reason}`,
              ),
              "",
            ];
          else if (h.kind === "cancel")
            return [
              `### Cancel`,
              ...h.functions.map(
                (f) =>
                  `  - ${f.function.method} ${f.function.path}: ${f.reason}`,
              ),
              "",
            ];
          return [];
        })
        .flat(),
    ];
    await fs.promises.writeFile(
      path.resolve(location),
      content.join("\n"),
      "utf8",
    );
  };

  const aggregateUsages = (
    usages: INestiaChatTokenUsage[],
  ): INestiaChatTokenUsage =>
    usages.reduce((a, b) => ({
      total: a.total + b.total,
      prompt: {
        total: a.prompt.total + b.prompt.total,
        audio: a.prompt.audio + b.prompt.audio,
        cached: a.prompt.cached + b.prompt.cached,
      },
      completion: {
        total: a.completion.total + b.completion.total,
        accepted_prediction:
          a.completion.accepted_prediction + b.completion.accepted_prediction,
        audio: a.completion.audio + b.completion.audio,
        reasoning: a.completion.reasoning + b.completion.reasoning,
        rejected_prediction:
          a.completion.rejected_prediction + b.completion.rejected_prediction,
      },
    }));

  const prepare = async (): Promise<void> => {
    const root: string = `${ConnectorConfiguration.ROOT}/docs/benchmarks/call`;
    if (fs.existsSync(root)) await fs.promises.rm(root, { recursive: true });
    await fs.promises.mkdir(root, { recursive: true });
  };
}

const LOCATION: string = `${ConnectorConfiguration.ROOT}/docs/benchmarks/call`;
