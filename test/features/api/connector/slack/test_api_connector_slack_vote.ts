import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { SlackProvider } from "../../../../../src/providers/connector/slack/SlackProvider";
import { ISlack } from "@wrtn/connector-api/lib/structures/connector/slack/ISlack";

export const test_api_connector_slack_vote_and_cancel = async (
  connection: CApi.IConnection,
) => {
  // 슬랙 투표 템플릿 메세지 전송
  const res = await CApi.functional.connector.slack.vote(connection, {
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    channel: "C07EWLN8T2Q",
    title: "KAKASOO2",
    items: [
      {
        link: "https://wrtn.ai",
        text: "뤼튼 서비스 홈페이지",
      },
      {
        link: "https://wrtn.io",
        text: "뤼튼 기업 홈페이지",
      },
    ],
  });

  typia.assert(res);

  // 액션 객체 내의 버튼 아이디는 클릭된 순간 버튼이 있던 블럭 아이디를 담기 때문
  const block_id = res.blocks?.find((el) =>
    el.text?.text?.includes("뤼튼 기업 홈페이지"),
  ).block_id;

  // pick_1 번을 골랐다는 가정의 테스트
  const voteInput = {
    payload: {
      user: { id: "U07EDKF5EKZ" },
      channel: { id: "C07EWLN8T2Q" },
      message: {
        user: "U07EDKF5EKZ",
        type: "message",
        ts: res?.ts,
        blocks: res.blocks,
      },
      actions: [
        { block_id, value: `pick_1/${ConnectorGlobal.env.SLACK_TEST_SECRET}` },
      ],
    },
  } as unknown as ISlack.InteractiveComponentInput;
  const voted = await new SlackProvider().interactivity(voteInput);

  // pick_1 번을 골랐다는 가정의 테스트
  const cancelInput = {
    payload: {
      user: { id: "U07EDKF5EKZ" },
      channel: { id: "C07EWLN8T2Q" },
      message: {
        user: "U07EDKF5EKZ",
        type: "message",
        ts: res?.ts,
        blocks: voted,
      },
      actions: [
        { block_id, value: `pick_1/${ConnectorGlobal.env.SLACK_TEST_SECRET}` },
      ],
    },
  } as unknown as ISlack.InteractiveComponentInput;
  await new SlackProvider().interactivity(cancelInput);
};
