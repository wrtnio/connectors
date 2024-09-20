import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform_create_empty_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  /**
   * Create Empty form
   */
  const res =
    await CApi.functional.connector.typeform.empty_form.createEmptyForm(
      connection,
      {
        name: "create-empty-form-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
