import { Injectable } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import axios from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class JiraProvider {
  async getUsersAssignable(
    input: IJira.IGetAssignableInput,
  ): Promise<IJira.IGetAssignableOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const queryParameter = createQueryParameter({
        a: input.maxResults,
        b: input.startAt,
        projectKeys: input.project_key,
      });
      const url = `${config.domain}/user/assignable/multiProjectSearch?${queryParameter}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
        },
      });
      console.log(JSON.stringify(res.data, null, 2));
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssueStatuses(
    input: IJira.IGetIssueStatusInput,
  ): Promise<IJira.IGetIssueStatusOutput> {
    try {
      const projectId = input.projectId;
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/status`;
      const res = await axios.get(url, {
        headers: {
          Authorization: config.Authorization,
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

  async getIssueTypes(
    input: IJira.IGetIssueTypeInput,
  ): Promise<IJira.IGetIssueTypeOutput> {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const url = `${config.domain}/issuetype?project_id=${input.projectId}`;
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
      | IJira.IGetProjectInputByBasicAuth
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

  async getIssues(
    input: IJira.IGetIssueInputByBasicAuth | IJira.IGetIssueInputBySecretKey,
  ) {
    try {
      const config = await this.getAuthorizationAndDomain(input);
      const res = await axios.post(
        `${config.domain}/search`,
        {
          jql: `project = ${input.project_key}`,
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
    input:
      | { secretKey: string }
      | { domain: string; email: string; apiToken: string },
  ): Promise<{ Authorization: string; domain: string }> {
    const Authorization = await this.getAuthorization(input);
    if (typia.is<{ secretKey: string }>(input)) {
      const accessTokenDto = await this.refresh({ secretKey: input.secretKey });
      const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);
      const domain = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3`;
      return { Authorization, domain };
    } else {
      const domain = `${input.domain}/rest/api/3`;
      return { Authorization, domain };
    }
  }

  async getAuthorization(
    input: { secretKey: string } | { email: string; apiToken: string },
  ) {
    if ("secretKey" in input) {
      const { access_token } = await this.refresh(input);
      return `Bearer ${access_token}`;
    } else {
      const basicAuth = `${input.email}:${input.apiToken}`;
      return `Basic ${Buffer.from(basicAuth).toString("base64")}`;
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
}
