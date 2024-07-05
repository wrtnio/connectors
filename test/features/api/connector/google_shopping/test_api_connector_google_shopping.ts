import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";

export const test_api_connector_google_shopping = async (
  connection: CApi.IConnection,
): Promise<IGoogleShopping.IResponse[]> => {
  const musinsa_result = await CApi.functional.connector.google_shopping.musinsa(
    connection,
    {
      keyword: "니트"
    },
  );
  typia.assertEquals(musinsa_result);
  return musinsa_result;
};
