import { Block, KnownBlock } from "@slack/web-api";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";

export namespace SlackTemplateProvider {
  export function voteTemplate(input: {
    secretKey: string;
    requester: string;
    title: string;
    items: { text: string; link: string }[];
  }): (Block | KnownBlock)[] {
    const NoVoted: ISlack.NoVoted = {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "No votes",
        },
      ],
    };

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
              value: `pick_${i}/${input.secretKey}`,
            },
          },
          NoVoted,
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
