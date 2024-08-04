import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class JiraProvider {
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
