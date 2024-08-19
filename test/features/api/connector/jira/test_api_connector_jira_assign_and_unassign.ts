import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_assign_and_unassign = async (
  connection: CApi.IConnection,
) => {
  // 담당자 지정 및 해제를 테스트할 이슈를 생성한다.
  const issue = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      fields: {
        summary: "ASSIGN AND UNASSIGN TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },
        description: {
          type: "doc",
          version: 1,
          content: [],
        },
      },
    },
  );

  // 담당자로 지정할만한 사람을 찾는다.
  const [candidate] =
    await CApi.functional.connector.jira.issues.get_users_assignable.getUsersAssignableInIssue(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueKey: issue["key"],
        project: "KAK",
      },
    );

  const beforeAssign =
    await CApi.functional.connector.jira.get_issue_detail.getIssueDetail(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueIdOrKey: issue.id,
      },
    );
  assert(beforeAssign.fields.assignee?.accountId === undefined);

  // 할당
  await CApi.functional.connector.jira.issues.asignee.assign(connection, {
    secretKey: JSON.stringify(Configuration),
    issueId: issue.id,
    asigneeId: candidate.accountId,
  });

  const afterAssign =
    await CApi.functional.connector.jira.get_issue_detail.getIssueDetail(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueIdOrKey: issue.id,
      },
    );
  assert(afterAssign.fields.assignee?.accountId, candidate.accountId);

  // 할당 해제
  await CApi.functional.connector.jira.issues.asignee.unassign(connection, {
    secretKey: JSON.stringify(Configuration),
    issueId: issue.id,
  });

  const afterUnassign =
    await CApi.functional.connector.jira.get_issue_detail.getIssueDetail(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueIdOrKey: issue.id,
      },
    );
  assert(afterUnassign.fields.assignee?.accountId === undefined);
};
