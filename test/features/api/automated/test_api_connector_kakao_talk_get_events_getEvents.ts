import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_get_events_getEvents = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IGetEventOutput> =
    await api.functional.connector.kakao_talk.get_events.getEvents(
      connection,
      typia.random<IKakaoTalk.IGetEventInput>(),
    );
  typia.assert(output);
};
