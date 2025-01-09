import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_imweb_get_products = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.imweb.customers.sales.getProducts(
    connection,
    {
      limit: 10,
      page: 1,
      unitCode: "",
      secretKey: "",
    },
  );

  typia.assert(res);
};
