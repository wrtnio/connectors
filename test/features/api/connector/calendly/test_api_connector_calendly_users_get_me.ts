import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_calendly_users_get_me = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const res = await CApi.functional.connector.calendly.users.get_me.getUserInfo(
    connection,
    {
      secretKey: ConnectorGlobal.env.CALENDLY_TEST_SECRET,
    },
  );
  typia.assert(res);
  return res;
};
