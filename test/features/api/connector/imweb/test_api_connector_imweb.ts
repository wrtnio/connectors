import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_imweb_get_access_token = async (
  connection: CApi.IConnection,
) => {
  const auth = await CApi.functional.connector.imweb.auth.authorization(
    connection,
    {
      key: ConnectorGlobal.env.IMWEB_TEST_API_KEY,
      secret: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
    },
  );

  typia.assert(auth);

  return auth.access_token;
};

export const test_api_connector_imweb_get_products = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.imweb.get_products.getProducts(
    connection,
    {
      key: ConnectorGlobal.env.IMWEB_TEST_API_KEY,
      secret: ConnectorGlobal.env.IMWEB_TEST_API_SECRET,
    },
  );

  typia.assert(res);
};
