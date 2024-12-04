import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICommon } from "../../../../src/api/structures/connector/common/ISecretValue";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_get_calendars_getCalendars = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IGetCalendarOutput> =
    await api.functional.connector.kakao_talk.get_calendars.getCalendars(
      connection,
      typia.random<ICommon.ISecret<"kakao", ["talk_calendar"]>>(),
    );
  typia.assert(output);
};
