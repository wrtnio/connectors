import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_get_workspaces_getWorkspaces = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Array<ITypeform.IFindWorkspaceOutput>> =
    await api.functional.connector.typeform.get_workspaces.getWorkspaces(
      connection,
      typia.random<ITypeform.ISecret>(),
    );
  typia.assert(output);
};
