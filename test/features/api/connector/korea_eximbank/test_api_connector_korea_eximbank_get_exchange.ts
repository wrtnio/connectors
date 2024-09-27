import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_korea_eximbank_get_exchanage = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.korea_eximbank.exchange.getExchange(
      connection,
    );

  typia.assert(res);
};
