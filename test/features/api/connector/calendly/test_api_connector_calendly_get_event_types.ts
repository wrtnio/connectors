import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_calendly_get_event_types = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.calendly.get_event_types.getEventTypes(
      connection,
      {
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );

  typia.assert(res);
};
