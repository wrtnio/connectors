import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform_get_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();

  /**
   * Get Forms
   */
  const res = await CApi.functional.connector.typeform.get_forms.getForms(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
  );
  typia.assert(res);
  return res;
};
