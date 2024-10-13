import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { SlackProvider } from "../../../../../src/providers/connector/slack/SlackProvider";

export const test_api_connector_slack_vote = async (
  connection: CApi.IConnection,
) => {
  await new SlackProvider().vote({
    secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
    channel: "C07EWLN8T2Q",
    title: "TEST",
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
};
