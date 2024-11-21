import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";

export const test_api_connector_airport_information = async (
  connection: CApi.IConnection,
): Promise<IAirportInformation.IResponse[]> => {
  const result = await CApi.functional.connector.airport_information.search(
    connection,
    {
      keyword: "대한민국",
    },
  );
  typia.assert(result);
  return result;
};
