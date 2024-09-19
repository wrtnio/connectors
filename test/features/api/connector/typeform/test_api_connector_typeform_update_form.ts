import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform_update_form = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  /**
   * Update Dropdown, Multiple Choice or Ranking Question Options in Typeform.
   */
  const res =
    await CApi.functional.connector.typeform.form_field_value_update.updateFormFieldValue(
      connection,
      {
        formId: "ZbhNmUjP",
        fieldId: "gqa4A59aC2QC",
        value: ["가", "나", "다", "라", "마"],
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(res);
};
