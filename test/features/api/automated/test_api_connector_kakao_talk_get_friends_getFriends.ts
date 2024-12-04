import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_get_friends_getFriends = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IGetFriendsOutput> =
    await api.functional.connector.kakao_talk.get_friends.getFriends(
      connection,
      typia.random<IKakaoTalk.IGetFriendsInput>(),
    );
  typia.assert(output);
};
