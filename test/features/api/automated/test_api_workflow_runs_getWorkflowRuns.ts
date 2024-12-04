import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IGetWorkflowRunsInput,
  IGetWorkflowRunsOutput,
} from "../../../../src/api/structures/workflow/Workflow";

export const test_api_workflow_runs_getWorkflowRuns = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGetWorkflowRunsOutput> =
    await api.functional.workflow.runs.getWorkflowRuns(
      connection,
      typia.random<IGetWorkflowRunsInput>(),
    );
  typia.assert(output);
};
