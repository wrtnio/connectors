import { Block, KnownBlock } from "@slack/web-api";

export namespace SlackTemplateProvider {
  export function voteTemplate(input: {
    requester: string;
    title: string;
    items: { text: string; link: string }[];
  }): (Block | KnownBlock)[] {
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${input.title}* Poll by ${input.requester}`,
        },
      },
      {
        type: "divider",
      },
      ...input.items.flatMap((item, i): (Block | KnownBlock)[] => {
        return [
          {
            type: "section",
            text: { type: "mrkdwn", text: `<${item.link}|${item.text}>` },
            accessory: {
              type: "button",
              text: { type: "plain_text", emoji: true, text: "Vote" },
              value: `pick_${i}`,
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "No votes",
              },
            ],
          },
        ];
      }),
      {
        type: "divider",
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Add a suggestion",
            },
            value: "suggestion",
          },
        ],
      },
    ];
  }
}
