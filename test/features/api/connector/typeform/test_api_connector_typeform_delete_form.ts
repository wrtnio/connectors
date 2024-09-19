import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_typeform_create_empty_form } from "./test_api_connector_typeform_create_empty_form";

export const test_api_connector_typeform_delete_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const form = await test_api_connector_typeform_create_empty_form(connection);

  /**
   * Delete Form
   */
  const res = await CApi.functional.connector.typeform.forms.deleteForm(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
    form.id,
  );
  typia.assert(res);
  return res;
};
