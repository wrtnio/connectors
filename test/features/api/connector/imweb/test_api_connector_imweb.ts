import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_imweb_index = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const list =
    await CApi.functional.connector.imweb.customers.sales.getProducts(
      connection,
      {
        limit: 10,
        page: 1,

        secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
      },
    );

  typia.assert(list);

  const detail = await CApi.functional.connector.imweb.customers.sales.at(
    connection,
    String(list.data[0].product_no),
    {
      secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
    },
  );

  typia.assert(detail);
};
