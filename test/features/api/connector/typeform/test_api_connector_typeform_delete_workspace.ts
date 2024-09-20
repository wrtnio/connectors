import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_typeform_create_workspace } from "./test_api_connector_typeform_create_workspace";

export const test_api_connector_typeform_delete_workspace = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const workspace =
    await test_api_connector_typeform_create_workspace(connection);

  /**
   * Delete Workspace
   */
  const res =
    await CApi.functional.connector.typeform.workspace.deleteWorkspace(
      connection,
      {
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
      workspace.id,
    );
  typia.assert(res);
  return res;
};
