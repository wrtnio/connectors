import axios from "axios";
import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_zoom_create_meeting = async (
  connection: CApi.IConnection,
) => {
  /**
   * 토큰 만료 시간이 1시간이기 때문에 차라리 refresh token을 configuration에 넣고 테스트에 활용.
   */
  const refreshToken = ConnectorGlobal.env.ZOOM_TEST_REFRESH_TOKEN;
  const authorizationCode = ConnectorGlobal.env.ZOOM_TEST_AUTHORIZATION_CODE;
  const authorizationHeader =
    ConnectorGlobal.env.ZOOM_TEST_AUTHORIZATION_HEADER;

  const refreshResponse = await axios.post(
    `https://zoom.us/oauth/token?code=${authorizationCode}&scope=meeting:write:admin,meeting:write`,
    {
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    },
    {
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const access_token = refreshResponse.data.access_token;
  const requestBody: IZoom.ICreateMeetingInput = {
    secretKey: access_token,
    userId: "studio@wrtn.io",
  };

  const res = await CApi.functional.connector.zoom.meetings.createMeeting(
    connection,
    requestBody,
  );

  typia.assert(res);
};
