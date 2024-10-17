import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_multion = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const res = await CApi.functional.connector.x.multion(connection);
  typia.assert(res);
  return res;
};
