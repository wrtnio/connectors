import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  IGetWorkflowRunStatusOutput,
  IGetWorkflowRunsInput,
  IGetWorkflowRunsOutput,
  IRunWorkflowInput,
  IRunWorkflowOutput,
} from "../../api/structures/workflow/Workflow";
import { WorkflowStateManager } from "../../utils/WorkflowStateManager";

@Injectable()
export class WorkflowProvider {
  constructor(private _workflowStateManager: WorkflowStateManager) {}

  public async run(input: IRunWorkflowInput): Promise<IRunWorkflowOutput> {
    const workflowRunId = await this._workflowStateManager.runWorkflow(
      input.workflowId,
    );
    return {
      workflowRunId,
    };
  }

  public async getWorkflowRunStatus(
    workflowRunId: string,
  ): Promise<IGetWorkflowRunStatusOutput> {
    const runStatus =
      await this._workflowStateManager.getWorkflowRunStatus(workflowRunId);
    // workflow run info doesn't exist
    if (!runStatus) {
      throw new HttpException("Workflow run not found", HttpStatus.NOT_FOUND);
    }
    return runStatus;
  }

  public async getWorkflowRuns(
    input: IGetWorkflowRunsInput,
  ): Promise<IGetWorkflowRunsOutput> {
    const workflowRuns = await this._workflowStateManager.getWorkflowRuns(
      input.workflowId,
    );
    return {
      workflowRuns,
    };
  }
}
