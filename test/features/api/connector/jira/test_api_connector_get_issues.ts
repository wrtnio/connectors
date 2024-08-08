import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_jira_get_projects } from "./test_api_connector_get_projects";

export const test_api_connector_jira_get_issues_without_paramter = async (
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
    const { issuetypes } =
      await CApi.functional.connector.jira.get_issue_types.getIssueTypes(
        connection,
        {
          email: "studio@wrtn.io",
          apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
          domain: "https://wrtn-ecosystem.atlassian.net",
          projectId: project.id,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: project.key,
        issuetype: issuetypes[0].id,
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_issues_with_status = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  for await (const project of projects) {
    const { statuses } =
      await CApi.functional.connector.jira.get_issue_statuses.getIssueStatus(
        connection,
        {
          email: "studio@wrtn.io",
          apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
          domain: "https://wrtn-ecosystem.atlassian.net",
          projectId: project.id,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: project.key,
        status: statuses[0].untranslatedName as any,
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_issues_with_assignees = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  for await (const project of projects) {
    const [user] =
      await CApi.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
        connection,
        {
          email: "studio@wrtn.io",
          apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
          domain: "https://wrtn-ecosystem.atlassian.net",
          project_key: project.key,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: project.key,
        assignee: user.displayName,
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_issues_with_created_start_date =
  async (connection: CApi.IConnection) => {
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
          created_start_date: "2024-08-07",
        },
      );

      typia.assertEquals(res);
    }
  };

export const test_api_connector_jira_get_issues_with_created_end_date = async (
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
        created_end_date: "2024-08-07",
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_users_assignable_in_issue = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      email: "studio@wrtn.io",
      apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
      domain: "https://wrtn-ecosystem.atlassian.net",
      project_key: projects[0].key,
    },
  );

  const [user] =
    await CApi.functional.connector.jira.issues.get_users_assignable.getUsersAssignableInIssue(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project: projects[0].key,
        issueKey: res.issues[0].key,
      },
    );

  typia.assertEquals(user);
};

export const test_api_connector_jira_get_issues_with_priority = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const projectKey = projects[0].key;

  const priorities =
    await CApi.functional.connector.jira.get_issue_priorities.getIssuePriorities(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
      },
    );

  assert(priorities.length >= 1);
  for (const priority of priorities) {
    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: projectKey,
        priority: priority.name,
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_get_issues_with_labels = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const projectKey = projects[0].key;

  const { values: labels } =
    await CApi.functional.connector.jira.get_issue_labels.getIssueLabels(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
      },
    );

  assert(labels.length >= 1);
  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      email: "studio@wrtn.io",
      apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
      domain: "https://wrtn-ecosystem.atlassian.net",
      project_key: projectKey,
      labels: labels,
    },
  );

  typia.assertEquals(res);
};

export const test_api_connector_jira_get_issues_with_non_existant_labels =
  async (connection: CApi.IConnection) => {
    const projects = await test_api_connector_jira_get_projects(connection);
    assert(projects.length >= 1);

    const projectKey = projects[0].key;

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: projectKey,
        labels: ["A", "B", "C"],
      },
    );

    typia.assertEquals(res);
  };

export const test_api_connector_jira_get_issues_with_empty_labels = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const projectKey = projects[0].key;
  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      email: "studio@wrtn.io",
      apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
      domain: "https://wrtn-ecosystem.atlassian.net",
      project_key: projectKey,
      labels: [],
    },
  );

  typia.assertEquals(res);
};
