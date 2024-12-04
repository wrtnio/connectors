import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_empty_form_createEmptyForm = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ITypeform.ICreateFormOutput> =
    await api.functional.connector.typeform.empty_form.createEmptyForm(
      connection,
      typia.random<ITypeform.ICreateEmptyFormInput>(),
    );
  typia.assert(output);
};
