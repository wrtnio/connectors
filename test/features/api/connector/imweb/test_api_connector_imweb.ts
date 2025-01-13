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
        search: {},
        secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
      },
    );

  typia.assert(list);

  for await (const product of list.data) {
    const detail = await CApi.functional.connector.imweb.customers.sales.at(
      connection,
      String(product.productNo),
      {
        secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
      },
    );

    console.log(detail);
    typia.assert(detail);
  }
};

export const test_api_connector_imweb_at = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const detail = await CApi.functional.connector.imweb.customers.sales.at(
    connection,
    String(3),
    {
      secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
    },
  );

  console.log(JSON.stringify(detail, null, 2));
  typia.assert(detail);
};
