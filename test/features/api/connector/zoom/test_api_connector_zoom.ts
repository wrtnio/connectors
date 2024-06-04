import axios from "axios";
import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IZoom } from "@wrtn/connector-api/lib/structures/zoom/IZoom";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

async function getAccessToken() {
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

  return refreshResponse.data.access_token;
}

export const test_api_connector_zoom_create_meeting = async (
  connection: CApi.IConnection,
) => {
  const access_token = await getAccessToken();
  const requestBody: IZoom.ICreateMeetingInput = {
    secretKey: access_token,
    userId: "studio@wrtn.io",
  };

  const res = await CApi.functional.connector.zoom.meetings.createMeeting(
    connection,
    requestBody,
  );

  typia.assertEquals(res);
  return res;
};

export const test_api_connector_zoom_create_meeting_registrant = async (
  connection: CApi.IConnection,
) => {
  const access_token = await getAccessToken();

  const meeting = await test_api_connector_zoom_create_meeting(connection);

  const requestBody: IZoom.IAddMeetingRegistrantInput = {
    secretKey: access_token,
    occurrenceIds:
      meeting.occurrences?.map((el) => el.occurrence_id).join(",") ?? "",
  };

  const res =
    await CApi.functional.connector.zoom.meetings.registrants.addMeetingRegistrant(
      connection,
      meeting.id,
      requestBody,
    );

  typia.assertEquals(res);
};
