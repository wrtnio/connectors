import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKakaoTalk } from "../../../../src/api/structures/connector/kakao_talk/IKakaoTalk";

export const test_api_connector_kakao_talk_memo_list_listMemo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKakaoTalk.IMemoOutput> =
    await api.functional.connector.kakao_talk.memo.list.listMemo(
      connection,
      typia.random<IKakaoTalk.ISendKakaoTalkListInput>(),
    );
  typia.assert(output);
};
