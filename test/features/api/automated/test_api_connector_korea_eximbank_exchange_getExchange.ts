import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKoreaEximbank } from "../../../../src/api/structures/connector/korea_eximbank/IKoreaEximbank";

export const test_api_connector_korea_eximbank_exchange_getExchange = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKoreaEximbank.IGetExchangeOutput> =
    await api.functional.connector.korea_eximbank.exchange.getExchange(
      connection,
    );
  typia.assert(output);
};
