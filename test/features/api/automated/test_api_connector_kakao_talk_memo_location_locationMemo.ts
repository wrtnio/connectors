import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_memo_location_locationMemo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IMemoOutput> =
    await api.functional.connector.kakao_talk.memo.location.locationMemo(
      connection,
      typia.random<IKakaoTalk.ISendKakaoTalkLocationInput>(),
    );
  typia.assert(output);
};
