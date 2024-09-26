import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_get_issue_statuses = async (
  connection: CApi.IConnection,
) => {
  const statuses =
    await CApi.functional.connector.jira.get_issue_statuses.getIssueStatus(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
      },
    );

  typia.assert(statuses);
  return statuses;
};
