import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_jira_get_projects } from "./test_api_connector_get_projects";
import assert from "assert";

export const test_api_connector_jira_get_issues = async (
  connection: CApi.IConnection,
) => {
  // const projects = await test_api_connector_jira_get_projects(connection);
  // assert(projects.length > 0);

  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      secretKey: ConnectorGlobal.env.JIRA_TEST_SECRET,
      project_key: "EC",
    },
  );

  console.log(JSON.stringify(res));
  typia.assertEquals(res);

  // for await (const project of projects) {
  //   const res = await CApi.functional.connector.jira.get_issues.getIssues(
  //     connection,
  //     {
  //       secretKey: ConnectorGlobal.env.JIRA_TEST_SECRET,
  //       project_key: project.key,
  //     },
  //   );

  //   typia.assertEquals(res);
  // }
};
