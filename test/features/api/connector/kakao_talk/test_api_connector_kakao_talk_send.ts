import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_kakao_talk_send_message = async (
  connection: CApi.IConnection,
) => {
  /**
   * 텍스트 메시지 발송.
   */
  const sendTextForm =
    await CApi.functional.connector.kakao_talk.message.text.send(connection, {
      secretKey: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
      receiver_uuids: ["z_jB88bwyfzQ5tbj1OPR4ND8yvnK_Mz-jg"],
      message: "텍스트 영역입니다. 최대 200자 표시 가능합니다.",
    });

  typia.assert(sendTextForm);
};
