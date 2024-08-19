import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_get_projects = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.get_projects.getProjects(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
    },
  );

  typia.assertEquals(res);
  return res.values;
};

export const test_api_connector_jira_get_projects_2 = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.get_projects.getProjects(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      maxResults: 50,
      startAt: 0,
      orderBy: "name",
    },
  );

  typia.assertEquals(res);
  return res.values;
};
