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

export const test_api_connector_jira_get_issues_without_paramter = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  for await (const project of projects) {
    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: project.key,
      },
    );

    typia.assert(res);
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
          secretKey: JSON.stringify(Configuration),
          projectId: project.id,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: project.key,
        issuetype: issuetypes[0].id,
      },
    );

    typia.assert(res);
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
          secretKey: JSON.stringify(Configuration),
          projectId: project.id,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: project.key,
        status: statuses[0].untranslatedName as any,
      },
    );

    typia.assert(res);
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
          secretKey: JSON.stringify(Configuration),
          project_key: project.key,
        },
      );

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: project.key,
        assignee: user.displayName,
      },
    );

    typia.assert(res);
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
          secretKey: JSON.stringify(Configuration),
          project_key: project.key,
          created_start_date: "2024-08-07",
        },
      );

      typia.assert(res);
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
        secretKey: JSON.stringify(Configuration),
        project_key: project.key,
        created_end_date: "2024-08-07",
      },
    );

    typia.assert(res);
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
      secretKey: JSON.stringify(Configuration),
      project_key: projects[0].key,
    },
  );

  const [user] =
    await CApi.functional.connector.jira.issues.get_users_assignable.getUsersAssignableInIssue(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project: projects[0].key,
        issueKey: res.issues[0].key,
      },
    );

  typia.assert(user);
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
        secretKey: JSON.stringify(Configuration),
      },
    );

  assert(priorities.length >= 1);
  for (const priority of priorities) {
    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: projectKey,
        priority: priority.name,
      },
    );

    typia.assert(res);
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
        secretKey: JSON.stringify(Configuration),
      },
    );

  assert(labels.length >= 1);
  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      project_key: projectKey,
      labels: labels,
    },
  );

  typia.assert(res);
};

export const test_api_connector_jira_get_issues_with_non_existant_labels =
  async (connection: CApi.IConnection) => {
    const projects = await test_api_connector_jira_get_projects(connection);
    assert(projects.length >= 1);

    const projectKey = projects[0].key;

    const res = await CApi.functional.connector.jira.get_issues.getIssues(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: projectKey,
        labels: ["A", "B", "C"],
      },
    );

    typia.assert(res);
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
      secretKey: JSON.stringify(Configuration),
      project_key: projectKey,
      labels: [],
    },
  );

  typia.assert(res);
};

export const test_api_connector_jira_get_one_detailed_issue = async (
  connection: CApi.IConnection,
) => {
  const projects = await test_api_connector_jira_get_projects(connection);
  assert(projects.length >= 1);

  const res = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      project_key: projects[0].key,
    },
  );

  typia.assert(res);

  for await (const issue of res.issues.slice(0, 10)) {
    const foundIssueById =
      await CApi.functional.connector.jira.get_issue_detail.getIssueDetail(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.id,
        },
      );

    typia.assert(foundIssueById);

    const foundIssueByKey =
      await CApi.functional.connector.jira.get_issue_detail.getIssueDetail(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.key,
        },
      );

    typia.assert(foundIssueByKey);
  }
};
