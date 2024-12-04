import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_auth_authorization = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IGetAccessTokenOutput> =
    await api.functional.connector.kakao_talk.auth.authorization(
      connection,
      typia.random<IKakaoTalk.IAuthorizationCode>(),
    );
  typia.assert(output);
};
