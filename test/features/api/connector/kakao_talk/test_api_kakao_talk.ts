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

  const memoResponse = await CApi.functional.connector.kakao_talk.memo(
    connection,
    {
      secretKey: res.access_token,
      template_object: {
        object_type: "text",
        text: "텍스트 영역입니다. 최대 200자 표시 가능합니다.",
        link: {
          web_url: "https://developers.kakao.com",
          mobile_web_url: "https://developers.kakao.com",
        },
      },
    },
  );

  typia.assertEquals(memoResponse);
};
