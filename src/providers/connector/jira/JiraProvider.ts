import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import type { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";

@Injectable()
export class JiraProvider {
  async getProjects(input: {
    secretKey: string;
  }): Promise<IJira.IGetProjectOutput> {
    const accessTokenDto = await this.refresh(input);
    const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);
    const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project/search`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessTokenDto.access_token}`,
      },
    });

    return res.data;
  }

  async getIssues(input: { secretKey: string }) {
    try {
      const accessTokenDto = await this.refresh(input);
      const { id: cloudId } = await this.getAccessibleResources(accessTokenDto);

      const res = await axios.post(
        `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search`,
        {
          jql: "project = KAK",
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenDto.access_token}`,
            Accept: "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
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

  async refresh(input: { secretKey: string }) {
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
  }
}
