import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_kakao_talk_get_friends = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.kakao_talk.get_firends.getFriends(
    connection,
    {
      secretKey: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
      limit: 1,
      offset: 1,
    },
  );

  typia.assertEquals(res);
};
