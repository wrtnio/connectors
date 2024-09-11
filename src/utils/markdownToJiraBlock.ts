import { lexer, MarkedToken, Token } from "marked";
import typia from "typia";
import { IJira, LookUp } from "../api/structures/connector/jira/IJira";
import {
  ListItemNode_1,
  ListNode,
} from "../api/structures/connector/jira/ListNode";

type JiraContentNode =
  | IJira.TopLevelBlockNode
  | IJira.InlineNode
  | ListItemNode_1;

function arrayTransform(tokens: Token[]): JiraContentNode[] {
  return tokens?.map(transform).filter((el) => el !== null) ?? [];
}

const is = typia.createIs<MarkedToken>();
function transform(token: Token): JiraContentNode | null {
  const target = is(token) ? token : null;
  if (target === null) {
    return null;
  }

  const targetMarkedToken = target as MarkedToken;
  if (targetMarkedToken.type === "blockquote") {
    return {
      // 인용구를 의미한다.
      type: "blockquote",
      content: arrayTransform(targetMarkedToken.tokens),
    } as IJira.BlockquoteNode;
  }
  if (targetMarkedToken.type === "br") {
    return {
      // 줄바꿈을 의미한다.
      type: "hardBreak",
      attrs: {
        text: "\n",
      },
    } as IJira.HardBreakNode;
  }
  if (targetMarkedToken.type === "code") {
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
    } as IJira.CodeBlockNode;
  }
  if (targetMarkedToken.type === "codespan") {
    // 백틱에 둘러쌓인, 강조된 문자열을 의미한다.
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "code",
        },
      ],
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "def") {
    // 링크 정의에 해당하나 각 링크 별로 흩어지는 게 맞는 듯 하다.
    return null;
  }
  if (targetMarkedToken.type === "del") {
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "strike",
        },
      ],
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "em") {
    return {
      type: "text",
      text: targetMarkedToken.text,
      marks: [
        {
          type: "em",
        },
      ],
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "escape") {
    return null;
  }
  if (targetMarkedToken.type === "heading") {
    return {
      type: "heading",
      content: arrayTransform(targetMarkedToken.tokens),
      attrs: {
        level: targetMarkedToken.depth <= 3 ? targetMarkedToken.depth : 3,
      },
    } as IJira.HeadingNode;
  }
  if (targetMarkedToken.type === "hr") {
    return {
      type: "rule",
    } as IJira.RuleNode;
  }
  if (targetMarkedToken.type === "html") {
    return {
      type: "text",
      text: targetMarkedToken.text,
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "image") {
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
            type: "external",
            url: targetMarkedToken.href,
          },
        },
      ],
      attrs: {
        layout: "center",
      },
    } as IJira.MediaSingleNode;
  }
  if (targetMarkedToken.type === "link") {
    return {
      text: targetMarkedToken.text,
      type: "text",
      marks: [
        {
          type: "link",
        },
      ],
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "list") {
    return {
      type: "bulletList",
      content: arrayTransform(targetMarkedToken.items),
    } as LookUp<ListNode, "bulletList">;
  }
  if (targetMarkedToken.type === "list_item") {
    return {
      type: "listItem",
      content: arrayTransform(targetMarkedToken.tokens),
    } as ListItemNode_1;
  }
  if (targetMarkedToken.type === "paragraph") {
    return {
      type: "paragraph",
      content: arrayTransform(targetMarkedToken.tokens),
    } as IJira.ParagraphNode;
  }
  if (targetMarkedToken.type === "space") {
    return {
      type: "hardBreak",
      attrs: {
        text: "\n",
      },
    } as IJira.HardBreakNode;
  }
  if (targetMarkedToken.type === "strong") {
    return {
      type: "text",
      marks: [
        {
          type: "strong",
        },
      ],
    } as IJira.TextContent;
  }
  if (targetMarkedToken.type === "table") {
    return {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              content: (targetMarkedToken.header
                ?.map((cell) => {
                  return {
                    type: "tabelCell",
                    content: arrayTransform(cell.tokens),
                  } as IJira.TableCellNode;
                })
                .filter((el: any) => el !== null) ?? []) as any,
            },
          ],
        } as IJira.TableRowNode,
        ...targetMarkedToken.rows.map((cells): IJira.TableRowNode => {
          return {
            type: "tableRow",
            content: cells.map((el) => {
              return {
                type: "tabelCell",
                content:
                  el.tokens.map(transform).filter((el: any) => el !== null) ??
                  [],
              } as IJira.TableCellNode;
            }),
          };
        }),
      ],
    } as IJira.TableNode;
  }

  if (targetMarkedToken.type === "text") {
    return {
      type: "text",
      text: targetMarkedToken.raw,
    } as IJira.TextContent;
  }

  return null;
}

export function markdownToJiraBlock(markdown: string): JiraContentNode[] {
  const tokensList = lexer(markdown);
  return arrayTransform(tokensList);
}
