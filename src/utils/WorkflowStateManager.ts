import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { ConnectorConfiguration } from "../ConnectorConfiguration";
import { IConnector } from "../api/structures/common/IConnector";
import { IGoogleSheet } from "../api/structures/connector/google_sheet/IGoogleSheet";
import { IWorkflowRunStatus } from "../api/structures/workflow/Workflow";

/**
 * Workflow State Manager
 * normally this should be a db to make data persistent
 * since this feature is only needed for poc, keep workflow states in memory
 */
@Injectable()
export class WorkflowStateManager {
  private workflowRuns: {
    [runId: string]: IWorkflowRunStatus;
  } = {};

  // TODO: there needs to be a better way but for now this works
  private async request({
    path,
    query,
    method,
    body,
  }: {
    path: string;
    query?: Record<string, string>;
    method: "get" | "post";
    body?: Record<string, unknown>;
  }): Promise<unknown> {
    const { data } = await axios({
      url: `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}/connector/${path}`,
      method,
      params: query,
      data: body,
    });
    return data;
  }

  private async runMarketingWorkflow(workflowRunId: string): Promise<void> {
    const searchOutput = (await this.request({
      path: "youtube-search",
      method: "post",
      body: { and_keywords: ["뤼튼"] },
    })) as IConnector.ISearchOutput;
    this.workflowRuns[workflowRunId].outputs.push({ result: searchOutput });
    const generateOutput = await this.request({
      path: "marketing-copy-generator",
      method: "post",
      body: {
        number_of_copies: 2,
        reference_contents: searchOutput.references,
        marketing_purpose: {
          purpose: "sign_up",
          product_name: "뤼튼 스튜디오",
          unique_selling_point: ["반복업무를 1분만에", "노코드로 업부 자동화 툴 제작"],
          user_benefit: ["첫 3개 워크플로우 제작 무료"],
        },
        distribution_channels: [
          {
            channel: "instagram_feed",
            components: ["title"],
          },
          {
            channel: "instagram_story",
            components: ["title", "cta"],
          },
          {
            channel: "youtube",
            components: ["title", "cta"],
          },
        ],
      },
    });
    this.workflowRuns[workflowRunId].outputs.push({ result: generateOutput });
    this.workflowRuns[workflowRunId].status = "finished";
  }

  private async runStudentReportWorkflow(workflowRunId: string): Promise<void> {
    const sheetData = (await this.request({
      path: "google-sheet/get-rows",
      method: "post",
      body: {
        url: "https://docs.google.com/spreadsheets/d/121ikQJr4IU1vYCVl73JyLheIAMry3uqDffLl7ndAjgg/edit#gid=0",
        workSheetTitle: "Sheet1",
      },
    })) as IGoogleSheet.IReadGoogleSheetRowsOutput;
    this.workflowRuns[workflowRunId].outputs.push({ result: sheetData });
    const generateOutput = await this.request({
      path: "student-report-generator",
      method: "post",
      body: {
        consideration: "Be nice",
        outputs: [
          {
            field_name: "Overall Evaluation",
            field_description: "Overall Evaluation",
            example: "Kim is a diligent student who excels in every subject and is a pleasure to teach.",
          },
        ],
        reference_data: sheetData.data,
      },
    });
    this.workflowRuns[workflowRunId].outputs.push({ result: generateOutput });
    this.workflowRuns[workflowRunId].status = "finished";
  }

  public async getWorkflowRunStatus(workflowRunId: string): Promise<IWorkflowRunStatus> {
    return this.workflowRuns[workflowRunId];
  }

  public async getWorkflowRuns(workflowId?: string): Promise<IWorkflowRunStatus[]> {
    const allRuns = Object.values(this.workflowRuns);
    return workflowId ? allRuns.filter((run) => run.workflowId === workflowId) : allRuns;
  }

  public async runWorkflow(workflowId: string): Promise<string> {
    const runId = uuidv4();
    this.workflowRuns[runId] = {
      workflowRunId: runId,
      workflowId: workflowId,
      status: "running",
      outputs: [],
    };

    const runWorkflow = {
      marketing: this.runMarketingWorkflow,
      "student-report": this.runStudentReportWorkflow,
    }[workflowId]?.bind(this);

    if (!runWorkflow) {
      // http status exception shouldn't be of concern in this scope but this is just for poc
      throw new HttpException(`Workflow ${workflowId} not found`, HttpStatus.NOT_FOUND);
    }

    // do not `await` workflows since workflows will be running for a while
    // meanwhile, client will be polling server to check workflow status
    runWorkflow(runId)
      // TODO: more refined error handling
      .catch((err) => {
        console.error(err);
      });

    return runId;
  }
}
