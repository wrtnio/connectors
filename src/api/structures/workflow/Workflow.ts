export interface IRunWorkflowInput {
  /**
   * Workflow id.
   * Usually this should be uuid, but for PoC we only have two fixed workflows.
   *
   * @title Workflow id.
   */
  workflowId: "marketing" | "student-report";
}

export interface IRunWorkflowOutput {
  /**
   * Workflow run id.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;
}

export interface IGetWorkflowRunStatusInput {
  /**
   * Workflow run id to get the workflow execution status.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;
}

export interface IGetNodeOutput {
  /**
   * Node execution result.
   *
   * @title Node execution result.
   */
  result: any;
}

export interface IWorkflowRunStatus {
  /**
   * Workflow run id.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;

  /**
   * Workflow id.
   *
   * @title Workflow Id.
   */
  workflowId: string;

  /**
   * Workflow running status.
   *
   * - running: running.
   * - finished: running completed.
   * - failed: running failed.
   *
   * @title running status.
   */
  status: "running" | "finished" | "failed";

  /**
   * Node execution result.
   *
   * @title Node execution result.
   */
  outputs: IGetNodeOutput[];
}

/**
 * Workflow execution status query result.
 *
 * @title Workflow execution status query result.
 */
export type IGetWorkflowRunStatusOutput = IWorkflowRunStatus;

export interface IGetWorkflowRunsInput {
  /**
   * If not specified, returns all runs.
   *
   * @title Workflow id.
   */
  workflowId?: string;
}

// since this is just for poc,
// don't think about optimizing performance too much and just return all information regarding runs in one call for convenience
export interface IGetWorkflowRunsOutput {
  /**
   * Workflow execution list.
   *
   * @title Workflow execution list.
   */
  workflowRuns: IWorkflowRunStatus[];
}
