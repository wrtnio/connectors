import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_x_get_pre_defined_influencers = async (
  connection: CApi.IConnection,
) => {
  await ConnectorGlobal.reload();
  const res =
    await CApi.functional.connector.x.get_influencers.getPreDefinedInfluencers(
      connection,
      {
        secretKey: ConnectorGlobal.env.X_TEST_SECRET,
      },
    );
  typia.assert(res);
  return res;
};
