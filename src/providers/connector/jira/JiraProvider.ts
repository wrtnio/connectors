import { Injectable } from "@nestjs/common";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import axios from "axios";
import typia from "typia";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class JiraProvider {
  async getProjectsByBasicAuth(
    input: IJira.IGetProjectInputByBasicAuth,
  ): Promise<IJira.IGetProjectOutput> {
    try {
      const { apiToken, domain, email, ...rest } = input;
      const queryParameter = createQueryParameter(rest);
      const url = `${domain}/rest/api/3/project/search?${queryParameter}`;
      const Authorization = await this.getAuthorization({ apiToken, email });
      const res = await axios.get(url, {
        headers: {
          Authorization,
        },
      });

      return typia.misc.assertClone<IJira.IGetProjectOutput>(res.data);
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssuesByBasicAuth(
    input: IJira.IGetIssueInputByBasicAuth,
  ): Promise<IJira.IGetIssueOutput> {
    try {
      const { apiToken, domain, email, project_key, ...rest } = input;
      const url = `${domain}/rest/api/3/search`;
      const Authorization = await this.getAuthorization({ apiToken, email });

      const res = await axios.post(
        url,
        {
          jql: `project = ${project_key}`,
          ...rest,
        },
        {
          headers: {
            Authorization,
            Accept: "application/json",
          },
        },
      );

      return typia.misc.assertClone<IJira.IGetIssueOutput>(res.data);
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getProjectsBySecretKey(
    input: IJira.IGetProjectInputBySecretKey,
  ): Promise<IJira.IGetProjectOutput> {
    try {
      const { secretKey, ...rest } = input;
      const accessTokenDto = await this.refresh({ secretKey });
      const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);
      const queryParameter = createQueryParameter(rest);
      const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project/search?${queryParameter}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessTokenDto.access_token}`,
        },
      });

      return typia.misc.assertClone<IJira.IGetProjectOutput>(res.data);
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getIssuesBySecretKey(
    input: IJira.IGetIssueInputBySecretKey,
  ): Promise<IJira.IGetIssueOutput> {
    try {
      const { secretKey, project_key, ...rest } = input;
      const accessTokenDto = await this.refresh({ secretKey });
      const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);
      const queryParameter = createQueryParameter(rest);

      const res = await axios.post(
        `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search?${queryParameter}`,
        {
          jql: `project = ${project_key}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenDto.access_token}`,
            Accept: "application/json",
          },
        },
      );

      return typia.misc.assertClone<IJira.IGetIssueOutput>(res.data);
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

  private async createBasicAuth() {
    return "";
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
