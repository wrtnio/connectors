import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISweetTracker } from "../../../../src/api/structures/connector/sweet_tracker/ISweetTacker";

export const test_api_connector_sweet_tacker_tracking_info_getTrackingInfo =
  async (connection: api.IConnection) => {
    const output: Primitive<ISweetTracker.IGetTrackingInfoOutput> =
      await api.functional.connector.sweet_tacker.tracking_info.getTrackingInfo(
        connection,
        typia.random<ISweetTracker.IGetTrackingInfoInput>(),
      );
    typia.assert(output);
  };
