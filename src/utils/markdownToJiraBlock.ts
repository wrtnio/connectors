import { lexer, MarkedToken, Token } from "marked";
import typia from "typia";
import { IJira } from "../api/structures/connector/jira/IJira";
import {
  ListItemNode_1,
  ListNode,
} from "../api/structures/connector/jira/ListNode";

type JiraContentNode =
  | IJira.TopLevelBlockNode
  | IJira.InlineNode
  | ListItemNode_1;

export function arrayTransform(options: {
  tokens: Token[];
  convertParagraph?: boolean;
}): JiraContentNode[] {
  return options.tokens
    ?.map((token) =>
      transform({ token, convertParagraph: options.convertParagraph }),
    )
    .filter((el) => el !== null);
}

const is = typia.createIs<MarkedToken>();
function transform(options: {
  token: Token;
  convertParagraph?: boolean;
}): JiraContentNode | null {
  const target = is(options.token) ? options.token : null;
  if (target === null) {
    return null;
  }

  const targetMarkedToken = target as MarkedToken;
  if (targetMarkedToken.type === "blockquote") {
    const transformed = arrayTransform({ tokens: targetMarkedToken.tokens });
    if (typia.is<IJira.BlockquoteNode["content"]>(transformed)) {
      return {
        type: "blockquote",
        content: transformed,
      } satisfies IJira.BlockquoteNode;
    } else {
      console.warn(
        JSON.stringify({
          message: "blockquote build failed.",
          targetMarkedToken,
          transformed,
        }),
      );
      return null;
    }
  } else if (targetMarkedToken.type === "br") {
    return null;
  } else if (targetMarkedToken.type === "code") {
    // 코드박스를 의미한다
    return {
      type: "codeBlock",
      content: [
        {
          type: "text",
          text: targetMarkedToken.text,
        },
      ],
      attrs: {
        language: targetMarkedToken.lang,
      },
    } satisfies IJira.CodeBlockNode;
  } else if (targetMarkedToken.type === "codespan") {
    // 백틱에 둘러쌓인, 강조된 문자열을 의미한다.
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "code",
        },
      ],
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "def") {
    // 링크 정의에 해당하나 각 링크 별로 흩어지는 게 맞는 듯 하다.
    return null;
  } else if (targetMarkedToken.type === "del") {
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "strike",
        },
      ],
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "em") {
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "em",
        },
      ],
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "escape") {
    return null;
  } else if (targetMarkedToken.type === "heading") {
    const transformed = arrayTransform({ tokens: targetMarkedToken.tokens });
    if (typia.is<IJira.InlineNode[]>(transformed)) {
      return {
        type: "heading",
        content: transformed,
        attrs: {
          level: (targetMarkedToken.depth <= 3
            ? targetMarkedToken.depth
            : 3) as 1 | 2 | 3,
        },
      } satisfies IJira.HeadingNode;
    } else {
      console.warn(
        JSON.stringify({
          message: "heading build failed.",
          targetMarkedToken,
          transformed,
        }),
      );
      return null;
    }
  } else if (targetMarkedToken.type === "hr") {
    return {
      type: "rule",
    } satisfies IJira.RuleNode;
  } else if (targetMarkedToken.type === "html") {
    return {
      type: "text",
      text: targetMarkedToken.text,
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "image") {
    return {
      type: "mediaSingle",
      content: [
        {
          type: "media",
          marks: {
            type: "link",
            attrs: {
              href: targetMarkedToken.href,
            },
          },
          attrs: {
            type: "link",
          },
        },
      ],
      attrs: {
        layout: "center",
      },
    } satisfies IJira.MediaSingleNode;
  } else if (targetMarkedToken.type === "link") {
    return {
      text: targetMarkedToken.title ?? targetMarkedToken.text,
      type: "text",
      marks: [
        {
          type: "link",
          attrs: {
            href: targetMarkedToken.href,
          },
        },
      ],
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "list") {
    return {
      type: targetMarkedToken.ordered ? "orderedList" : "bulletList",
      content: targetMarkedToken.items
        .map((item) => {
          const transformed = arrayTransform({
            tokens: item.tokens,
            convertParagraph: true,
          });
          if (typia.is<ListItemNode_1["content"]>(transformed)) {
            return {
              type: "listItem",
              content: transformed,
            } satisfies ListItemNode_1;
          } else {
            return null;
          }
        })
        .filter((el) => el !== null),
    } satisfies ListNode;
  } else if (targetMarkedToken.type === "paragraph") {
    const transformed = arrayTransform({ tokens: targetMarkedToken.tokens });
    if (transformed.length === 1 && transformed[0].type === "mediaSingle") {
      return transformed[0];
    } else if (typia.is<IJira.InlineNode[]>(transformed)) {
      return {
        type: "paragraph",
        content: transformed,
      } satisfies IJira.ParagraphNode;
    } else {
      console.warn(
        JSON.stringify({
          message: "paragraph build failed.",
          targetMarkedToken,
          transformed,
        }),
      );
      return null;
    }
  } else if (targetMarkedToken.type === "space") {
    return {
      type: "paragraph",
      content: [
        {
          // 줄바꿈을 의미한다.
          type: "hardBreak",
          attrs: {
            text: "\n",
          },
        },
      ],
    } satisfies IJira.ParagraphNode;
  } else if (targetMarkedToken.type === "strong") {
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "strong",
        },
      ],
    } satisfies IJira.TextContent;
  } else if (targetMarkedToken.type === "table") {
    return {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              content: targetMarkedToken.header?.map((cell) => {
                const transformed = arrayTransform({
                  tokens: cell.tokens,
                  convertParagraph: true,
                });
                if (typia.is<IJira.TableCellNode["content"]>(transformed)) {
                  return {
                    type: "tableCell",
                    content: transformed,
                  } satisfies IJira.TableCellNode;
                } else {
                  console.warn(
                    JSON.stringify({
                      message: "tableHeader, tableCell build failed.",
                      cell,
                      transformed,
                    }),
                  );

                  return null;
                }
              }) as any[],
            },
          ],
        } satisfies IJira.TableRowNode,
        ...targetMarkedToken.rows.map((cells): IJira.TableRowNode => {
          return {
            type: "tableRow",
            content: cells.map((cell) => {
              const transformed = arrayTransform({
                tokens: cell.tokens,
                convertParagraph: true,
              });
              if (typia.is<IJira.TableCellNode["content"]>(transformed)) {
                return {
                  type: "tableCell",
                  content: transformed,
                } satisfies IJira.TableCellNode;
              } else {
                console.warn(
                  JSON.stringify({
                    message: "tableRow, tableCell build failed.",
                    cell,
                    transformed,
                  }),
                );

                return null;
              }
            }) as any[],
          };
        }),
      ],
    } satisfies IJira.TableNode;
  } else if (targetMarkedToken.type === "text") {
    if (options.convertParagraph) {
      return {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: targetMarkedToken.text,
          },
        ],
      } satisfies IJira.ParagraphNode;
    } else {
      return {
        type: "text",
        text: targetMarkedToken.raw,
      } satisfies IJira.TextContent;
    }
  }

  return null;
}

export function markdownToJiraBlock(markdown: string): JiraContentNode[] {
  const tokensList = lexer(markdown);
  return arrayTransform({ tokens: tokensList });
}
