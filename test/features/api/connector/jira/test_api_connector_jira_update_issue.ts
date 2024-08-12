import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_update_issue_summary_and_description =
  async (connection: CApi.IConnection) => {
    // 업데이트 테스트 용으로 이슈 생성
    const target = await CApi.functional.connector.jira.issues.createIssue(
      connection,
      {
        ...Configuration,
        fields: {
          summary: "TEST FOR UPDATE",
          project: { key: "KAK" },
          issuetype: { id: "10005" },

          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "codeBlock",
                content: [
                  {
                    type: "text",
                    text: "console.log(123); // code box test",
                  },
                ],
              } as IJira.CodeBlockNode as IJira.TopLevelBlockNode,
            ],
          },
        },
      },
    );

    const updateSummary =
      await CApi.functional.connector.jira.issues.updateIssue(
        connection,
        target.id,
        {
          ...Configuration,
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
          ...Configuration,
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
  const target = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST FOR UPDATE",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "codeBlock",
              content: [
                {
                  type: "text",
                  text: "console.log(123); // code box test",
                },
              ],
            } as IJira.CodeBlockNode as IJira.TopLevelBlockNode,
          ],
        },
      },
    },
  );
  const response =
    await CApi.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
      connection,
      {
        ...Configuration,
        project_key: "KAK",
      },
    );

  const updateAssignee =
    await CApi.functional.connector.jira.issues.updateIssue(
      connection,
      target.id,
      {
        ...Configuration,
        fields: {
          assignee: {
            id: response[0].accountId,
          },
        },
      },
    );

  typia.assertEquals(updateAssignee);
};
