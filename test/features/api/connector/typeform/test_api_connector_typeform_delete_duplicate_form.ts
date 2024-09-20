import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_typeform_duplicate_existing_form } from "./test_api_connector_typeform_duplicate_existing_form";

export const test_api_connector_typeform_delete_duplicate_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const duplicateForm =
    await test_api_connector_typeform_duplicate_existing_form(connection);

  /**
   * Delete Duplicate Form
   */
  const res = await CApi.functional.connector.typeform.forms.deleteForm(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
    duplicateForm.id,
  );
  typia.assert(res);
  return res;
};
