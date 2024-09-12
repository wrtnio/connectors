import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_calendly_get_event_types } from "./test_api_connector_calendly_get_event_types";

export const test_api_connector_calendly_users_create_scheduling_links = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const types = await test_api_connector_calendly_get_event_types(connection);
  const eventTypeUri = types.collection?.[0].uri;

  const res =
    await CApi.functional.connector.calendly.scheduling_links.createSchedulingLink(
      connection,
      {
        owner: eventTypeUri,
        secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
      },
    );

  typia.assert(res);
  return res;
};
