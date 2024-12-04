import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ITypeform } from "../../../../src/api/structures/connector/typeform/ITypeform";

export const test_api_connector_typeform_forms_get_update_form_fields_getFieldsForUpdateFieldValue =
  async (connection: api.IConnection) => {
    const output: Primitive<
      Array<ITypeform.IFieldInfoForUpdateFieldValueOutput>
    > =
      await api.functional.connector.typeform.forms.get_update_form_fields.getFieldsForUpdateFieldValue(
        connection,
        typia.random<ITypeform.IGetFieldForUpdateFieldValueInput>(),
      );
    typia.assert(output);
  };
