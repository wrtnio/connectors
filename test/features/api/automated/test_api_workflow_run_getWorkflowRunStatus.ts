import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IWorkflowRunStatus } from "../../../../src/api/structures/workflow/Workflow";

export const test_api_workflow_run_getWorkflowRunStatus = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IWorkflowRunStatus> =
    await api.functional.workflow.run.getWorkflowRunStatus(
      connection,
      typia.random<string>(),
    );
  typia.assert(output);
};
