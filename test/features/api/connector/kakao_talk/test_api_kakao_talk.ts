import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_kakao_talk_memo = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.kakao_talk.refresh(connection, {
    refresh_token: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
  });

  typia.assertEquals(res);
};
