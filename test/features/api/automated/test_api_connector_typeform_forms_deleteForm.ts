import typia from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_forms_deleteForm = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.connector.typeform.forms.deleteForm(
    connection,
    typia.random<ITypeform.ISecret>(),
    typia.random<string>(),
  );
  typia.assert(output);
};
