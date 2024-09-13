import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_update_issue_summary_and_description =
  async (connection: CApi.IConnection) => {
    // 업데이트 테스트 용으로 이슈 생성
    const target =
      await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          fields: {
            summary: "TEST FOR UPDATE",
            project: { key: "KAK" },
            issuetype: { id: "10005" },

            description: {
              type: "doc",
              version: 1,
              content: "```typescript\nconsole.log(123); // code box test\n```",
            },
          },
        },
      );

    const updateSummary =
      await CApi.functional.connector.jira.issues.updateIssue(
        connection,
        target.id,
        {
          secretKey: JSON.stringify(Configuration),
          fields: {
            summary: "TEST_FOR_UPDATE", // summary 수정 테스트
          },
        },
      );

    typia.assertEquals(updateSummary);

    const updateDescription =
      await CApi.functional.connector.jira.issues.updateIssue(
        connection,
        target.id,
        {
          secretKey: JSON.stringify(Configuration),
          fields: {
            description: {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 1,
                  },
                  content: [
                    {
                      type: "text",
                      text: "UPDATED",
                    },
                  ],
                },
              ],
            },
          },
        },
      );

    typia.assertEquals(updateDescription);
  };

export const test_api_connector_jira_update_issue_assignee = async (
  connection: CApi.IConnection,
) => {
  // 업데이트 테스트 용으로 이슈 생성
  const target =
    await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          summary: "TEST FOR UPDATE",
          project: { key: "KAK" },
          issuetype: { id: "10005" },

          description: {
            type: "doc",
            version: 1,
            content: "```typescript\nconsole.log(123); // code box test\n```",
          },
        },
      },
    );

  const response =
    await CApi.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        project_key: "KAK",
      },
    );

  const updateAssignee =
    await CApi.functional.connector.jira.issues.updateIssue(
      connection,
      target.id,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          assignee: {
            id: response[0].accountId,
          },
        },
      },
    );

  typia.assertEquals(updateAssignee);
};

export const test_api_connector_jira_update_issue_status = async (
  connection: CApi.IConnection,
) => {
  const { issues } = await CApi.functional.connector.jira.get_issues.getIssues(
    connection,
    {
      secretKey: JSON.stringify(Configuration),
      project_key: "KAK",
      maxResults: 200,
      status: "Backlog",
    },
  );

  for await (const issue of issues) {
    const { transitions } =
      await CApi.functional.connector.jira.issues.get_transitions.getTransitions(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.id,
        },
      );

    // 완료 상태로 갈 수 있는 게 있는지 찾는다.
    const transition = transitions.find(
      (el) => el.to.statusCategory.key === "done", // key는 done이지만 status 조회 시는 Done으로 나온다. 이는 Jira가 대소문자 구분을 안하기 때문.
    );

    const res =
      await CApi.functional.connector.jira.issues.status.updateIssueStatus(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.id,
          transitionId: transition?.id as any,
        },
      );

    typia.assertEquals(res);
  }
};
