import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_get_status = async (
  connection: CApi.IConnection,
) => {
  const statuses = await CApi.functional.connector.jira.get_statuses.getStatus(
    connection,
    {
      ...Configuration,
    },
  );

  typia.assertEquals(statuses);
  return statuses;
};
