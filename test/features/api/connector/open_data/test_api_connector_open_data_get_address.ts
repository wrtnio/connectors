import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_open_data_get_address = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getAddress(connection, {
    srchwrd: "01471",
  });

  typia.assertEquals(res);
};
