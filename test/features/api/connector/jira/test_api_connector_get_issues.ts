import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_jira_get_projects } from "./test_api_connector_get_projects";

export const test_api_connector_jira_get_issues = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  for await (const project of projects) {
    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: project.key,
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_issues_with_issue_type = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  for await (const project of projects) {
    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: project.key,
      },
    );

    typia.assertEquals(res);
  }
};
