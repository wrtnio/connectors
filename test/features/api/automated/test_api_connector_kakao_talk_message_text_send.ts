import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_message_text_send = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.ISendKakaoTalkToFriendsOutput> =
    await api.functional.connector.kakao_talk.message.text.send(
      connection,
      typia.random<IKakaoTalk.ISendKakaoTalkToFriendsInput>(),
    );
  typia.assert(output);
};
