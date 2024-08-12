import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_create_comment = async (
  connection: CApi.IConnection,
) => {
  // 댓글을 작성할 이슈를 생성한다.
  const issue = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "CREATION OF ISSUE",
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

  // 댓글을 작성하기 전을 조회한다.
  const before =
    await CApi.functional.connector.jira.issues.get_comments.getComments(
      connection,
      {
        ...Configuration,
        issueIdOrKey: issue.id,
      },
    );

  const comment =
    await CApi.functional.connector.jira.issues.comments.createComment(
      connection,
      {
        ...Configuration,
        issueIdOrKey: issue.id,
        body: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "CREATE COMMENT TEST",
                },
              ],
            },
          ],
        },
      },
    );

  // 댓글을 작성한 다음을 조회한다.
  const after =
    await CApi.functional.connector.jira.issues.get_comments.getComments(
      connection,
      {
        ...Configuration,
        issueIdOrKey: issue.key, // 이번에는 키를 이용해서 조회해본다.
      },
    );

  typia.assertEquals(comment);
  typia.assertEquals(before);
  typia.assertEquals(after);

  assert(before.comments.length + 1 === after.comments.length);
};
