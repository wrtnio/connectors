import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { v4 } from "uuid";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_jira_create_issue = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      email: "studio@wrtn.io",
      apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
      domain: "https://wrtn-ecosystem.atlassian.net",
      fields: {
        summary: "TEST",
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
                  text: "console.log(1234567890);",
                },
              ],
              attrs: {
                language: "typescript",
              },
            },
            {
              type: "paragraph",
              content: [],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Just Paragraph",
                },
                {
                  type: "text",
                  text: "is",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                },
              ],
            },
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "mention",
                      attrs: {
                        id: v4(),
                        text: "@studio",
                      },
                    },
                    {
                      type: "text",
                      text: "~, ",
                    },
                    {
                      type: "text",
                      text: "hi",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(res);
};
