import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_imweb_index = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.write({
    IMWEB_TEST_API_SECRET:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlQ29kZSI6IlMyMDI1MDEwODYxMTRjNTE1NzFmYzQiLCJhcHBDb2RlIjoiZ2EyMDI1MDEwOGVhZTI4NWY0YjQ1NTgiLCJ1bml0Q29kZSI6WyJ1MjAyNTAxMDg2NzdlMzU2MGFlMjk3Il0sInNjb3BlIjpbInNpdGUtaW5mbzpyZWFkIiwibWVtYmVyLWluZm86cmVhZCIsInByb21vdGlvbjpyZWFkIiwiY29tbXVuaXR5OnJlYWQiLCJwcm9kdWN0OnJlYWQiLCJvcmRlcjpyZWFkIiwicGF5bWVudDpyZWFkIl0sInNpdGVWZXJzaW9uIjoiZnJlZSIsImlhdCI6MTczNjQ5NTg0NywiZXhwIjoxNzQ0MjcxODQ3fQ.TtjbN88Swn0D7eJ_05fqW8hs1ALPHA675aPK2iJnPlg",
  });
  await ConnectorGlobal.reload();
  const list =
    await CApi.functional.connector.imweb.customers.sales.getProducts(
      connection,
      {
        limit: 10,
        page: 1,
        unitCode: "u20250108677e3560ae297",
        secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
      },
    );

  typia.assert(list);

  const detail = await CApi.functional.connector.imweb.customers.sales.at(
    connection,
    list.data[0].id,
    {
      unitCode: "u20250108677e3560ae297",
      secretKey: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
    },
  );

  typia.assert(detail);
};
