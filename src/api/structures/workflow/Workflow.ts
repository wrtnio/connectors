export interface IRunWorkflowInput {
  /**
   * 워크플로우 id.
   * 보통 uuid 여야 하지만 PoC를 위해 두개의 고정된 워크플로우만 있습니다.
   *
   * @title Workflow id.
   */
  workflowId: "marketing" | "student-report";
}

export interface IRunWorkflowOutput {
  /**
   * 워크플로우 실행 id.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;
}

export interface IGetWorkflowRunStatusInput {
  /**
   * 워크플로우 실행 상태를 받아오기 위한 워크플로우 실행 id.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;
}

export interface IGetNodeOutput {
  /**
   * 노드 실행 결과.
   *
   * @title 노드 실행 결과.
   */
  result: any;
}

export interface IWorkflowRunStatus {
  /**
   * 워크 플로우 실행 id.
   *
   * @title Workflow run id.
   */
  workflowRunId: string;

  /**
   * 워크플로우 id.
   *
   * @title Workflow Id.
   */
  workflowId: string;

  /**
   * 워크 플로우 실행 상태.
   *
   * - running: 실행 중.
   * - finished: 실행 완료.
   * - failed: 실행 실패.
   *
   * @title running status.
   */
  status: "running" | "finished" | "failed";

  /**
   * 노드 실행 결과.
   *
   * @title 노드 실행 결과.
   */
  outputs: IGetNodeOutput[];
}

/**
 * 워크플로우 실행 상태 조회 결과.
 *
 * @title 워크플로우 실행 상태 조회 결과.
 */
export type IGetWorkflowRunStatusOutput = IWorkflowRunStatus;

export interface IGetWorkflowRunsInput {
  /**
   * 지정되지 않으면 모든 실행을 반환.
   *
   * @title 워크플로우 id.
   */
  workflowId?: string;
}

// since this is just for poc,
// don't think about optimizing performance too much and just return all information regarding runs in one call for convenience
export interface IGetWorkflowRunsOutput {
  /**
   * 워크플로우 실행 목록.
   *
   * @title 워크플로우 실행 목록.
   */
  workflowRuns: IWorkflowRunStatus[];
}
