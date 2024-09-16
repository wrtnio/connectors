import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IGetWorkflowRunStatusOutput,
  IGetWorkflowRunsInput,
  IGetWorkflowRunsOutput,
  IRunWorkflowInput,
  IRunWorkflowOutput,
} from "../../api/structures/workflow/Workflow";
import { WorkflowProvider } from "../../providers/workflow/WorkflowProvider";

/**
 * Workflow contoller for running workflows and checking running workflow statuses
 * (for poc purpose only)
 */
@Controller("workflow")
export class WorkflowController {
  constructor(private _workflowProvider: WorkflowProvider) {}
  /**
   * Run workflow
   *
   * @internal
   */
  @core.TypedRoute.Post("run")
  public runWorkflow(
    @core.TypedBody() input: IRunWorkflowInput,
  ): Promise<IRunWorkflowOutput> {
    return this._workflowProvider.run(input);
  }

  /**
   * Return status of one workflow run
   *
   * @internal
   */
  @core.TypedRoute.Get("run/:workflowRunId")
  public getWorkflowRunStatus(
    @core.TypedParam("workflowRunId") workflowRunId: string,
  ): Promise<IGetWorkflowRunStatusOutput> {
    return this._workflowProvider.getWorkflowRunStatus(workflowRunId);
  }

  /**
   * Return all workflow run information
   *
   * @internal
   */
  @core.TypedRoute.Get("runs")
  public getWorkflowRuns(
    @core.TypedQuery() input: IGetWorkflowRunsInput,
  ): Promise<IGetWorkflowRunsOutput> {
    return this._workflowProvider.getWorkflowRuns(input);
  }
}
