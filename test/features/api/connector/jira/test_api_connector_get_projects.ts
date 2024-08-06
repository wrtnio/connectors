import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_jira_get_projects = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.get_projects.getProjects(
    connection,
    {
      email: "studio@wrtn.io",
      apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
      domain: "https://wrtn-ecosystem.atlassian.net",
    },
  );

  typia.assertEquals(res);
  return res.values;
};
