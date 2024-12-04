import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISweetTracker } from "../../../../src/api/structures/connector/sweet_tracker/ISweetTacker";

export const test_api_connector_sweet_tacker_get_companies_getCompanyList =
  async (connection: api.IConnection) => {
    const output: Primitive<ISweetTracker.IGetCompanyListOutput> =
      await api.functional.connector.sweet_tacker.get_companies.getCompanyList(
        connection,
      );
    typia.assert(output);
  };
