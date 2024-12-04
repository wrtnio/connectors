import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_refresh = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IRefreshAccessTokenOutput> =
    await api.functional.connector.kakao_talk.refresh(
      connection,
      typia.random<IKakaoTalk.IRefreshAccessTokenInput>(),
    );
  typia.assert(output);
};
