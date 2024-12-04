import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_workspace_createWorkspace = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ITypeform.ICreateWorkspaceOutput> =
    await api.functional.connector.typeform.workspace.createWorkspace(
      connection,
      typia.random<ITypeform.ICreateWorkspaceInput>(),
    );
  typia.assert(output);
};
