import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_create_random_issue_code_block = async (
  connection: CApi.IConnection,
) => {
  // codeBlock type의 content에 attrs 프로퍼티가 없는 경우에 대한 테스트
  const case1 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
                  text: "console.log(123); // code box test",
                },
              ],
            } as IJira.CodeBlockNode as IJira.TopLevelBlockNode,
          ],
        },
      },
    },
  );

  typia.assertEquals(case1);

  // 언어가 명시된 경우에 대한 테스트
  const case2 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
              attrs: {
                language: "typescript",
              },
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

  typia.assertEquals(case2);

  // 언어는 명시되어 있지만 존재하지 않는 언어 이름인 경우에 대한 테스트
  const case3 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
              attrs: {
                language: "kakasoo",
              },
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

  typia.assertEquals(case3);
};

export const test_api_connector_jira_create_random_issue_paragraph = async (
  connection: CApi.IConnection,
) => {
  // 단순 텍스트를 가진 Paragraph 타입에 대한 테스트로, attrs는 없는 경우
  const case1 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
                  type: "text",
                  text: "kakasoo",
                  marks: [],
                } as IJira.TextContent, // 타입에 대한 테스트로, TextContent에 부합하는지를 우선 검증
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case1);

  // attrs가 빈 배열인 경우에 대한 테스트
  const case2 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
              attrs: {},
              content: [
                {
                  type: "text",
                  text: "kakasoo",
                } as IJira.TextContent, // 타입에 대한 테스트로, TextContent에 부합하는지를 우선 검증
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case2);

  // 내부의 텍스트 노드가 링크인 경우에 대한 테스트
  const case3 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
              attrs: {},
              content: [
                {
                  type: "text",
                  text: "kakasoo",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://wrtn.ai",
                      },
                    },
                  ],
                } as IJira.TextContent, // 타입에 대한 테스트로, TextContent에 부합하는지를 우선 검증
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case3);

  const content = typia.random<IJira.ParagraphNode>();
  const res = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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

export const test_api_connector_jira_create_random_issue_paragraph_2 = async (
  connection: CApi.IConnection,
) => {
  // 생성에 실패했던 케이스 검증
  const failedCase = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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
                  type: "hardBreak",
                },
                {
                  type: "inlineCard",
                  attrs: {
                    url: "https://twfdxphqjs.gwz",
                  },
                },
                {
                  type: "inlineCard",
                  attrs: {
                    url: "https://twfdxphqjs.gwz",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(failedCase);
};

export const test_api_connector_jira_create_random_issue_media_single = async (
  connection: CApi.IConnection,
) => {
  // 원본 이미지 사이즈로 생성하고자 하는 경우 (800x450의 뤼튼 이미지 사용)
  const case1 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          version: 1,
          type: "doc",
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
                    type: "external",
                    url: "https://wrtn.io/wp-content/themes/wrtn-ko/images/ogimage.jpg",
                    width: 800, // 원본 이미지가 800x450
                    height: 450, // 원본 이미지가 800x450
                  },
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case1);

  // 원본 이미지 사이즈의 비율을 유지한 상태로 줄인 경우
  const case2 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          version: 1,
          type: "doc",
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
                    type: "external",
                    url: "https://wrtn.io/wp-content/themes/wrtn-ko/images/ogimage.jpg",
                    width: 400, // 원본 이미지가 800x450
                    height: 225, // 원본 이미지가 800x450
                  },
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case2);

  // 원본 이미지 사이즈의 비율을 유지한 상태로 늘린 경우
  const case3 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          version: 1,
          type: "doc",
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
                    type: "external",
                    url: "https://wrtn.io/wp-content/themes/wrtn-ko/images/ogimage.jpg",
                    width: 1200, // 원본 이미지가 800x450
                    height: 675, // 원본 이미지가 800x450
                  },
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case3);

  // 원본 이미지 사이즈의 비율이 깨진 경우
  const case4 = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          version: 1,
          type: "doc",
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
                    type: "external",
                    url: "https://wrtn.io/wp-content/themes/wrtn-ko/images/ogimage.jpg",
                    width: 800, // 원본 이미지가 800x450
                    height: 100, // 원본 이미지가 800x450
                  },
                },
              ],
            },
          ],
        },
      },
    },
  );

  typia.assertEquals(case4);
};

export const test_api_connector_jira_create_random_issue_mention = async (
  connection: CApi.IConnection,
) => {
  const response =
    await CApi.functional.connector.jira.projects.get_users_assignable.getUsersAssignableInProject(
      connection,
      {
        ...Configuration,
        project_key: "KAK",
      },
    );

  const res = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
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

export const test_api_connector_jira_create_random_issue_blockquote = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.jira.issues.createIssue(
    connection,
    {
      ...Configuration,
      fields: {
        summary: "TEST",
        project: { key: "KAK" },
        issuetype: { id: "10005" },

        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "blockquote",
              content: [
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "codeBlock",
                          content: [
                            {
                              type: "text",
                              text: "console.log(123)",
                            },
                          ],
                        },
                      ],
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
