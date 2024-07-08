import CApi from "@wrtn/connector-api/lib/index";
import { deepStrictEqual } from "assert";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_get_clients = async (
  connection: CApi.IConnection,
) => {
  const secretKey = ConnectorGlobal.env.GOOGLE_TEST_SECRET;
  const customers =
    await CApi.functional.connector.google_ads.get_customers.getCustomers(
      connection,
      {
        secretKey,
      },
    );

  /**
   * secretKey에 해당하는 고객의 client는 자기 자신밖에 존재하지 않는다.
   */
  typia.assert(customers);
  deepStrictEqual(customers.length, 1);
};
