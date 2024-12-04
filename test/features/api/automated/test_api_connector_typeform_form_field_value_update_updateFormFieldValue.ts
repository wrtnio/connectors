import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_form_field_value_update_updateFormFieldValue =
  async (connection: api.IConnection) => {
    const output: Primitive<ITypeform.IUpdateFormFieldValueOutput> =
      await api.functional.connector.typeform.form_field_value_update.updateFormFieldValue(
        connection,
        typia.random<ITypeform.IUpdateFormFieldValueInput>(),
      );
    typia.assert(output);
  };
