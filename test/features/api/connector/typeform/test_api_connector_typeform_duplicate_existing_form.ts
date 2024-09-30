import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_typeform_get_form } from "./test_api_connector_typeform_get_form";
import { test_api_connector_typeform_create_workspace } from "./test_api_connector_typeform_create_workspace";

export const test_api_connector_typeform_duplicate_existing_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const forms = await test_api_connector_typeform_get_form(connection);
  const workspace =
    await test_api_connector_typeform_create_workspace(connection);

  /**
   * Duplicate Existing Form
   */
  const res =
    await CApi.functional.connector.typeform.duplicate_form.duplicateExistingForm(
      connection,
      {
        workspaceLink: workspace.link,
        formId: forms[0].formId,
        name: "duplicate-form-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
