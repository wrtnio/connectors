import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform_create_workspace = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  /**
   * Create Workspace
   */
  const res =
    await CApi.functional.connector.typeform.workspace.createWorkspace(
      connection,
      {
        name: "create-workspace-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
