import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform_get_workspace = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();

  /**
   * Get Workspaces
   */
  const res =
    await CApi.functional.connector.typeform.get_workspaces.getWorkspaces(
      connection,
      {
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
