import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_jira_get_projects = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.get_projects.getProjects(
    connection,
    {
      secretKey: ConnectorGlobal.env.JIRA_TEST_SECRET,
    },
  );

  typia.assertEquals(res);
  return res.values;
};
