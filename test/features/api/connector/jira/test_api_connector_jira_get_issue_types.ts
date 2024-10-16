import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_jira_get_projects } from "./test_api_connector_jira_get_projects";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_get_issue_type_by_number_project_id =
  async (connection: CApi.IConnection) => {
    const projects = await test_api_connector_jira_get_projects(connection);
    assert(projects.length >= 1);

    const res =
      await CApi.functional.connector.jira.get_issue_types.getIssueTypes(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          projectId: Number(projects[0].id),
        },
      );

    typia.assert(res);
  };

export const test_api_connector_jira_get_issue_type_string_project_id = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const res =
    await CApi.functional.connector.jira.get_issue_types.getIssueTypes(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        projectId: String(projects[0].id),
      },
    );

  typia.assert(res);
};
