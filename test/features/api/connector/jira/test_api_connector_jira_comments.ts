import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import assert, { deepStrictEqual } from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_create_and_update_and_delete_comment =
  async (connection: CApi.IConnection) => {
    // 댓글을 작성할 이슈를 생성한다.
    const issue =
      await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          fields: {
            summary: "CREATION OF ISSUE",
            project: { key: "KAK" },
            issuetype: { id: "10005" },
            description: {
              type: "doc",
              version: 1,
              content:
                "# test_api_connector_jira_create_and_update_and_delete_comment",
            },
          },
        },
      );

    // 댓글을 작성하기 전을 조회한다.
    const before =
      await CApi.functional.connector.jira.issues.get_comments.getComments(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.id,
        },
      );

    // 댓글을 작성한다
    const comment =
      await CApi.functional.connector.jira.issues.comments.markdown.createComment(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.id,
          body: {
            type: "doc",
            version: 1,
            content: "CREATE COMMENT TEST",
          },
        },
      );

    // 댓글을 작성한 다음을 조회한다.
    const after =
      await CApi.functional.connector.jira.issues.get_comments.getComments(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.key, // 이번에는 키를 이용해서 조회해본다.
        },
      );

    typia.assertEquals(comment);
    typia.assertEquals(before);
    typia.assertEquals(after);

    // 댓글이 1개 늘어난 걸 검증한다.
    assert(before.comments.length + 1 === after.comments.length);

    console.log("HERE?");
    await CApi.functional.connector.jira.issues.comments.markdown.updateComment(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueIdOrKey: issue.id,
        commentId: comment.id,
        body: {
          type: "doc",
          version: 1,
          content: "UPDATED COMMENT!",
        },
      },
    );

    const afterUpdate =
      await CApi.functional.connector.jira.issues.get_comments.getComments(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.key,
        },
      );

    const updatedContent = afterUpdate.comments.find(
      (el) => el.id === comment.id,
    )?.body.content;

    // 댓글을 수정한다.
    const contentToUpdate = [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "UPDATED COMMENT!",
          },
        ],
      },
    ] satisfies IJira.TopLevelBlockNode[];

    // 수정한 것과 수정 전에 수정하고자 했던 내역이 일치하는지 확인하여 수정 여부를 확인한다.
    deepStrictEqual(updatedContent, contentToUpdate);

    // 댓글을 삭제한다
    await CApi.functional.connector.jira.issues.comments.deleteComment(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        issueIdOrKey: issue.id,
        commentId: comment.id,
      },
    );

    // 댓글을 작성한 다음을 조회한다.
    const afterDelete =
      await CApi.functional.connector.jira.issues.get_comments.getComments(
        connection,
        {
          secretKey: JSON.stringify(Configuration),
          issueIdOrKey: issue.key, // 이번에는 키를 이용해서 조회해본다.
        },
      );

    typia.assertEquals(afterDelete);
    assert(afterDelete.comments.length === 0);
  };
