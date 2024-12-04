import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_duplicate_form_duplicateExistingForm =
  async (connection: api.IConnection) => {
    const output: Primitive<ITypeform.ICreateFormOutput> =
      await api.functional.connector.typeform.duplicate_form.duplicateExistingForm(
        connection,
        typia.random<ITypeform.IDuplicateExistingFormInput>(),
      );
    typia.assert(output);
  };
