import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { MyPartial } from "../../../../src/api/structures/types/MyPartial";
import type { IZoom } from "../../../../src/api/structures/zoom/IZoom";

export const test_api_connector_zoom_meetings_createMeeting = async (
  connection: api.IConnection,
) => {
  const output: Primitive<MyPartial<IZoom.Meeting>> =
    await api.functional.connector.zoom.meetings.createMeeting(
      connection,
      typia.random<IZoom.ICreateMeetingInput>(),
    );
  typia.assert(output);
};
