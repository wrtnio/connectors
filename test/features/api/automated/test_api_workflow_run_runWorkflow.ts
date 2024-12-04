import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IRunWorkflowInput,
  IRunWorkflowOutput,
} from "../../../../src/api/structures/workflow/Workflow";

export const test_api_workflow_run_runWorkflow = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IRunWorkflowOutput> =
    await api.functional.workflow.run.runWorkflow(
      connection,
      typia.random<IRunWorkflowInput>(),
    );
  typia.assert(output);
};
