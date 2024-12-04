import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_calendars_events_createEvent =
  async (connection: api.IConnection) => {
    const output: Primitive<IKakaoTalk.ICreateEventOutput> =
      await api.functional.connector.kakao_talk.calendars.events.createEvent(
        connection,
        typia.random<IKakaoTalk.ICreateEventInput>(),
      );
    typia.assert(output);
  };
