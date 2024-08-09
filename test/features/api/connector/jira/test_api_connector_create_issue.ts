import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import typia from "typia";
import { v4 } from "uuid";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_jira_create_issue_manually = async (
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
                  // marks: {
                  //   type: "code",
                  // },
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
                      type: "link",
                      attrs: {
                        href: "https://wrtn.ai",
                      },
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

export const test_api_connector_jira_create_random_issue_code_block = async (
  connection: CApi.IConnection,
) => {
  const content = typia.random<IJira.CodeBlockContent>();
  console.log(JSON.stringify(content, null, 2));
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
          content: [content],
        },
      },
    },
  );

  typia.assertEquals(res);
};

export const test_api_connector_jira_create_random_issue_text = async (
  connection: CApi.IConnection,
) => {
  // const content = typia.random<IJira.TextContent>();
  // console.log(JSON.stringify(content, null, 2));
  // const res = await CApi.functional.connector.jira.issues.createIssue(
  //   connection,
  //   {
  //     email: "studio@wrtn.io",
  //     apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  //     domain: "https://wrtn-ecosystem.atlassian.net",
  //     fields: {
  //       summary: "TEST",
  //       project: { key: "KAK" },
  //       issuetype: { id: "10005" },

  //       description: {
  //         type: "doc",
  //         version: 1,
  //         content: [content],
  //       },
  //     },
  //   },
  // );

  // typia.assertEquals(res);

  const failedTextContents = [
    {
      type: "text",
      text: "icxsgrycn",
      marks: [
        {
          type: "link",
          attrs: {
            href: "https://wrtn.ai",
          },
        },
        {
          type: "link",
          attrs: {
            href: "https://wrtn.ai",
          },
        },
      ],
    },
  ] satisfies IJira.Content[];

  for await (const content of failedTextContents) {
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
            content: [content],
          },
        },
      },
    );

    typia.assertEquals(res);
  }
};

export const test_api_connector_jira_create_random_issue_paragraph = async (
  connection: CApi.IConnection,
) => {
  const content = typia.random<IJira.ParagraphContent>();
  console.log(JSON.stringify(content, null, 2));
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
          content: [content],
        },
      },
    },
  );

  typia.assertEquals(res);
};

export const test_api_connector_jira_create_random_issue_mention = async (
  connection: CApi.IConnection,
) => {
  const response =
    await CApi.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
      connection,
      {
        email: "studio@wrtn.io",
        apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
        domain: "https://wrtn-ecosystem.atlassian.net",
        project_key: "KAK",
      },
    );

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
              type: "paragraph",
              content: [
                {
                  type: "mention",
                  attrs: {
                    id: response[0].accountId,
                    text: `@${response[0].displayName}`,
                  },
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

export const test_api_connector_jira_create_random_issue_media = async (
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
              type: "mediaSingle",
              attrs: {
                layout: "center",
              },
              content: [
                {
                  type: "media",
                  attrs: {
                    id: "4478e39c-cf9b-41d1-ba92-68589487cd75",
                    type: "file",
                    collection: "MediaServicesSample",
                    alt: "moon.jpeg",
                    width: 225,
                    height: 225,
                  },
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://developer.atlassian.com/platform/atlassian-document-format/concepts/document-structure/nodes/media/#media",
                      },
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

export const test_api_connector_jira_create_random_issue_blockquote = async (
  connection: CApi.IConnection,
) => {
  const content = typia.random<IJira.BlockquoteType>();
  console.log(JSON.stringify(content, null, 2));
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
          content: [content],
        },
      },
    },
  );

  typia.assertEquals(res);
};
