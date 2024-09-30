import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_typeform_get_form } from "./test_api_connector_typeform_get_form";

export const test_api_connector_typeform_get_properties_for_update_field_value =
  async (connection: CApi.IConnection) => {
    await ConnectorGlobal.reload();
    const forms = await test_api_connector_typeform_get_form(connection);
    /**
     * getPropertiesForUpdateFieldValue
     */
    const res =
      await CApi.functional.connector.typeform.forms.get_update_form_fields.getFieldsForUpdateFieldValue(
        connection,
        {
          formId: forms[0].formId,
          secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
        },
      );
    typia.assert(res);
    return res;
  };
