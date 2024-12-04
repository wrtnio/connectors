import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISweetTracker } from "../../../../src/api/structures/connector/sweet_tracker/ISweetTacker";

export const test_api_connector_sweet_tacker_get_companies_recommended_getRecommendedCompanyList =
  async (connection: api.IConnection) => {
    const output: Primitive<ISweetTracker.IGetRecommendedCompanyListOutput> =
      await api.functional.connector.sweet_tacker.get_companies.recommended.getRecommendedCompanyList(
        connection,
        typia.random<ISweetTracker.IGetRecommendedCompanyListInput>(),
      );
    typia.assert(output);
  };
