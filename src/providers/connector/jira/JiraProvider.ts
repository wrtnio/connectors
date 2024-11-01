import { Injectable } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import axios from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { markdownToJiraBlock } from "../../../utils/markdownToJiraBlock";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";

@Injectable()
export class JiraProvider {
  async getUsersAssignableInIssue(
    input: IJira.__IGetIssueAssignableInput,
  ): Promise<IJira.IGetIssueAssignableOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const queryParameter = createQueryParameter({
        maxResults: input.maxResults,
        startAt: input.startAt,
        project: input.project,
        issueKey: input.issueKey,
      });

      const url = `${config.domain}/user/assignable/search?${queryParameter}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getStatusCategories(
    input: IJira.__IGetStatusCategoryInput,
  ): Promise<IJira.IGetStatusCategoryOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.get(`${config.domain}/statuscategory`, {
        headers: {
          Authorization: config.Authorization,
          Accept: "application/json",
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getUsersAssignableInProject(
    input: IJira.__IGetProjectAssignableInput,
  ): Promise<IJira.IGetProjectAssignableOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const queryParameter = createQueryParameter({
        maxResults: input.maxResults,
        startAt: input.startAt,
        projectKeys: input.project_key,
      });
      const url = `${config.domain}/user/assignable/multiProjectSearch?${queryParameter}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssueStatuses(
    input: IJira.__IGetIssueStatusInput,
  ): Promise<IJira.IGetIssueStatusOutput> {
    try {
      const projectId = input.projectId;
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/status`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
          Accept: "application/json",
        },
      });

      return {
        statuses: res.data
          .filter((status: { scope?: { project: { id: string } } }) =>
            // 프로젝트로 필터링하고자 projectId를 프론트에서 전달한 경우, 상태의 범위가 프로젝트를 모두 포괄하거나 또는 해당 프로젝트에 속한 경우만 전달
            projectId
              ? status.scope?.project.id === projectId ||
                !status.scope?.project.id
              : true,
          )
          .map((status: { scope?: { project: { id: string } } }) => {
            const fixedProjectId = status.scope?.project.id ?? projectId;
            return { ...status, projectId: fixedProjectId };
          }),
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssueLabels(
    input: IJira.__IGetIssueLabelInput,
  ): Promise<IJira.IGetIssueLabelOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/label`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssuePriorities(
    input: IJira.__IGetIssuePriorityInput,
  ): Promise<IJira.IGetIssuePriorityOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/priority`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssueTypes(
    input: IJira.__IGetIssueTypeInput,
  ): Promise<IJira.IGetIssueTypeOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/issuetype/project?projectId=${input.projectId}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });

      return { issuetypes: res.data };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getProjects(
    input:
      | IJira.__IGetProjectInputByBasicAuth
      | IJira.IGetProjectInputBySecretKey,
  ) {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const queryParameter = createQueryParameter({
        maxResults: input.maxResults,
        orderBy: input.orderBy,
        startAt: input.startAt,
      });

      const url = `${config.domain}/project/search?${queryParameter}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssueDetail(
    input: IJira.__IGetIssueDetailInput,
  ): Promise<IJira.IGetIssueDetailOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.get(
        `${config.domain}/issue/${input.issueIdOrKey}`,
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssues(
    input: IJira.__IGetIssueInputByBasicAuth | IJira.IGetIssueInputBySecretKey,
  ): Promise<IJira.IGetIssueOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.post(
        `${config.domain}/search`,
        {
          jql: `
          project = "${input.project_key}"
          ${input.issuetype ? ` AND issuetype = "${input.issuetype}" ` : ""}
          ${input.status ? ` AND status = "${input.status}" ` : ""}
          ${input.assignee ? ` AND assignee = "${input.assignee}" ` : ""}
          ${input.reporter ? ` AND reporter = "${input.reporter}" ` : ""}
          ${input.priority ? ` AND priority = "${input.priority}" ` : ""}
          ${input.labels?.length ? ` AND labels IN (${input.labels.map((label) => `"${label}"`)}) ` : ""}
          ${input.created_start_date ? ` AND created >= "${input.created_start_date}" ` : ""}
          ${input.created_end_date ? ` AND created < "${input.created_end_date}" ` : ""}
          ${input.keyword ? ` AND text ~ "${input.keyword}" ` : ""}
          `,
          ...(input.maxResults && { maxResults: input.maxResults }),
          ...(input.startAt && { startAt: input.startAt }),
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getUserProfile(input: {
    access_token: string;
  }): Promise<{ email: string }> {
    const url = `https://api.atlassian.com/me`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${input.access_token}`,
      },
    });

    return res.data;
  }

  async getAccessibleResources(input: {
    access_token: string;
  }): Promise<IJira.IGetAccessibleResourcesOutput> {
    const url = `https://api.atlassian.com/oauth/token/accessible-resources`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${input.access_token}`,
      },
    });

    return res.data[0];
  }

  async getAuthorizationAndDomain(
    input: { secretKey: string } | IJira.BasicAuthorization,
  ): Promise<{ Authorization: string; domain: string }> {
    const Authorization = await this.getAuthorization(input);
    if ("email" in input && "token" in input) {
      const domain = `${input.domain}/rest/api/3`;
      return { Authorization, domain };
    } else {
      // OAuth
      const accessTokenDto = await this.refresh({ secretKey: input.secretKey });
      const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);
      const domain = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3`;
      return { Authorization, domain };
    }
  }

  async getAuthorization(
    input:
      | IJira.IBasicSecret
      | Pick<IJira.BasicAuthorization, "token" | "email">,
  ) {
    // secretKey를 가지고 있지만 OAuth가 아닌 경우가 있을 수 있기 때문에 email, token 검증을 먼저 하게 한다. (basic auth 우선)
    if ("email" in input && "token" in input) {
      const basicAuth = `${input.email}:${input.token}`;
      return `Basic ${Buffer.from(basicAuth).toString("base64")}`;
    } else if ("secretKey" in input) {
      const { access_token } = await this.refresh(input);
      return `Bearer ${access_token}`;
    } else {
      throw new Error("getAuthorization error");
    }
  }

  private async refresh(input: { secretKey: string }) {
    try {
      const url = `https://auth.atlassian.com/oauth/token` as const;
      const res = await axios.post(
        url,
        {
          grant_type: "refresh_token",
          client_id: ConnectorGlobal.env.JIRA_CLIENT_ID,
          client_secret: ConnectorGlobal.env.JIRA_CLIENT_SECRET,
          redirect_uri: ConnectorGlobal.env.JIRA_REFRESH_URI,
          refresh_token: input.secretKey,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res.data as { access_token: string };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteComment(input: IJira.__IDeleteCommentInput): Promise<void> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      await axios.delete(
        `${config.domain}/issue/${input.issueIdOrKey}/comment/${input.commentId}`,
        {
          headers: {
            Authorization: config.Authorization,
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createComment(
    input: IJira.__ICreateCommentByMarkdownInput,
  ): Promise<IJira.ICreateCommentOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const copiedInput: Pick<IJira.ICreateCommentInput, "body"> = JSON.parse(
        JSON.stringify(input),
      );

      if (typeof input.body.content === "string") {
        const content = markdownToJiraBlock(input.body.content);
        copiedInput.body.content = content;
      }

      const res = await axios.post(
        `${config.domain}/issue/${input.issueIdOrKey}/comment`,
        {
          body: copiedInput.body,
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getComments(
    input: IJira.__IGetCommentInput,
  ): Promise<IJira.IGetCommentOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.get(
        `${config.domain}/issue/${input.issueIdOrKey}/comment`,
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async unassign(input: IJira.__IUnAssignInput): Promise<void> {
    try {
      await this.updateIssue(input.issueId, {
        email: input.email,
        token: input.token,
        domain: input.domain,
        fields: {
          assignee: {
            id: null,
          },
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async assign(input: IJira.__IAssignInput): Promise<void> {
    try {
      await this.updateIssue(input.issueId, {
        email: input.email,
        token: input.token,
        domain: input.domain,
        fields: {
          assignee: {
            id: input.asigneeId,
          },
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getTransitions(
    input: IJira.__IGetTransitionInput,
  ): Promise<IJira.IGetTransitionOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.get(
        `${config.domain}/issue/${input.issueIdOrKey}/transitions`,
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async updateIssueStatus(input: IJira.__IUpdateStatusInput): Promise<void> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      await axios.post(
        `${config.domain}/issue/${input.issueIdOrKey}/transitions`,
        {
          transition: {
            id: input.transitionId,
          },
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async updateComment(
    input: IJira.IUpdateCommentByMarkdownInput,
  ): Promise<void> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const copiedInput = JSON.parse(JSON.stringify(input));
      if (typeof input.body.content === "string") {
        const content = markdownToJiraBlock(input.body.content);
        copiedInput.body.content = content;
      }

      const { commentId, issueIdOrKey } = input;
      await axios.put(
        `${config.domain}/issue/${issueIdOrKey}/comment/${commentId}`,
        {
          body: copiedInput.body,
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async updateIssue(
    id: IJira.Issue["id"],
    input: IJira.__IUpdateIssueInput,
  ): Promise<void> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      await axios.put(
        `${config.domain}/issue/${id}`,
        {
          fields: input.fields,
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createIssueByMarkdown(
    input: IJira.ICreateIssueByMarkdownInput,
  ): Promise<{ id: string; key: string }> {
    try {
      const copiedInput = JSON.parse(JSON.stringify(input));
      if (typeof input.fields.description?.content === "string") {
        const content = markdownToJiraBlock(input.fields.description.content);
        copiedInput.fields.description.content = content;
      }

      const config = await this.getAuthorizationAndDomain(copiedInput);
      const res = await axios.post(
        `${config.domain}/issue`,
        {
          fields: copiedInput.fields,
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createIssue(
    input: IJira.ICreateIssueInput,
  ): Promise<{ id: string; key: string }> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.post(
        `${config.domain}/issue`,
        {
          fields: input.fields,
        },
        {
          headers: {
            Authorization: config.Authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  parseSecretKey(input: IJira.IBasicSecret): IJira.BasicAuthorization {
    return typia.json.assertParse<IJira.BasicAuthorization>(input.secretKey);
  }

  async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;

    return token;
  }
}
