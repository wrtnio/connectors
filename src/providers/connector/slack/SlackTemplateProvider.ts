import { Block, KnownBlock } from "@slack/web-api";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";
import { StrictOmit } from "@wrtn/connector-api/lib/structures/types/strictOmit";

export namespace SlackTemplateProvider {
  export function voteTemplate(
    input: StrictOmit<ISlack.IHoldVoteInput, "channel"> & {
      /**
       * @title requester's name
       */
      requester: string;
    },
  ): (Block | KnownBlock)[] {
    const NoVoted: ISlack.NoVoted = {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "No votes",
        },
      ],
    };

    const options = input.items.flatMap((item, i): (Block | KnownBlock)[] => {
      return [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: item.link ? `<${item.link}|${item.text}>` : item.text,
          },
          accessory: {
            type: "button",
            text: { type: "plain_text", emoji: true, text: "Vote" },
            value: `pick_${i}/${input.secretKey}`,
          },
        },
        NoVoted,
      ];
    });

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
      ...options,
      {
        type: "divider",
      },
      // {
      //   type: "actions",
      //   elements: [
      //     {
      //       type: "button",
      //       text: { type: "plain_text", emoji: true, text: "Add a suggestion" },
      //       value: "suggestion",
      //     },
      //   ],
      // },
    ];
  }
}
